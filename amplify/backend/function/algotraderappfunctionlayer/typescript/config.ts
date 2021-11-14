import logger from './logger';
import { captureAWSv3Client } from 'aws-xray-sdk';
import {
  GetParametersCommand,
  SSMClient,
  Parameter,
} from '@aws-sdk/client-ssm';

const secretKeys = {
  TD_CONSUMER_KEY: 'tdConsumerKey',
};

const ssmKeys = Object.keys(secretKeys);

const client = captureAWSv3Client(new SSMClient({}));

export interface IConfig {
  algoTraderTableDbArn: string;
  algoTraderTableDbName: string;
  algoTraderTableDbStreamArn: string;
  cognitoUserPoolId: string;
  lambdaEnv: string;
  lambdaRegion: string;
  tdConsumerKey: string;
}

const _getSecrets = async () => {
  const command = new GetParametersCommand({
    Names: ssmKeys.map((secretName) => process.env[secretName]),
    WithDecryption: true,
  });

  const { Parameters } = await client.send(command);

  const secretsReducer = (acc: {}, curr: Parameter) => {
    let name = curr.Name;

    for (const key in secretKeys) {
      if (name.endsWith(key)) {
        name = secretKeys[key];
        break;
      }
    }

    acc[name] = curr.Value;

    return acc;
  };

  return Parameters.reduce(secretsReducer, {});
};

export const getConfig = async (
  getSecrets: boolean = true
): Promise<IConfig> => {
  logger.info('Getting config');

  const config = {
    tdConsumerKey: null,
    cognitoUserPoolId: process.env.AUTH_ALGOTRADERAPP7860B9F7_USERPOOLID,
    lambdaEnv: process.env.ENV,
    lambdaRegion: process.env.REGION,
    algoTraderTableDbArn: process.env.STORAGE_ALGOTRADERTABLE_ARN,
    algoTraderTableDbName: process.env.STORAGE_ALGOTRADERTABLE_NAME,
    algoTraderTableDbStreamArn: process.env.STORAGE_ALGOTRADERTABLE_STREAMARN,
  };

  const ssmConfig = getSecrets ? _getSecrets() : {};

  return { ...config, ...ssmConfig };
};
