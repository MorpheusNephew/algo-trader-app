import {
  GetParametersCommand,
  SSMClient,
  Parameter,
} from '@aws-sdk/client-ssm';

const secretKeys = {
  TD_CONSUMER_KEY: 'tdConsumerKey',
  CBOE_ID: 'cboeId',
  CBOE_SECRET: 'cboeSecret',
};

const ssmKeys = Object.keys(secretKeys);

export interface IConfig {
  algoTraderTableDbArn: string;
  algoTraderTableDbName: string;
  algoTraderTableDbStreamArn: string;
  cboeId: string;
  cboeSecret: string;
  cognitoUserPoolId: string;
  lambdaEnv: string;
  lambdaRegion: string;
  tdConsumerKey: string;
}

const _getConfig = async (): Promise<IConfig> => {
  const config = {
    tdConsumerKey: null,
    cboeId: null,
    cboeSecret: null,
    cognitoUserPoolId: process.env.AUTH_ALGOTRADERAPP7860B9F7_USERPOOLID,
    lambdaEnv: process.env.ENV,
    lambdaRegion: process.env.REGION,
    algoTraderTableDbArn: process.env.STORAGE_ALGOTRADERTABLE_ARN,
    algoTraderTableDbName: process.env.STORAGE_ALGOTRADERTABLE_NAME,
    algoTraderTableDbStreamArn: process.env.STORAGE_ALGOTRADERTABLE_STREAMARN,
  };

  const client = new SSMClient({});
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

  const ssmConfig = Parameters.reduce(secretsReducer, {});

  return { ...config, ...ssmConfig };
};

let configInstance = null;

export class Config {
  static async getConfig(): Promise<IConfig> {
    if (!configInstance) {
      configInstance = await _getConfig();
    }

    return configInstance;
  }
}
