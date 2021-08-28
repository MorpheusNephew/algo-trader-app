import { SSM } from 'aws-sdk';

const tdConsumerKey = 'TD_CONSUMER_KEY';

const ssmKeys = [tdConsumerKey];

export interface IConfig {
  algoTraderTableDbArn: string;
  algoTraderTableDbName: string;
  algoTraderTableDbStreamArn: string;
  cognitoUserPoolId: string;
  lambdaEnv: string;
  lambdaRegion: string;
  tdConsumerKey: string;
}

const getConfig = async (): Promise<IConfig> => {
  const config = {
    tdConsumerKey: null,
    cognitoUserPoolId: process.env.AUTH_ALGOTRADERAPP7860B9F7_USERPOOLID,
    lambdaEnv: process.env.ENV,
    lambdaRegion: process.env.REGION,
    algoTraderTableDbArn: process.env.STORAGE_ALGOTRADERTABLE_ARN,
    algoTraderTableDbName: process.env.STORAGE_ALGOTRADERTABLE_NAME,
    algoTraderTableDbStreamArn: process.env.STORAGE_ALGOTRADERTABLE_STREAMARN,
  };

  const { Parameters } = await new SSM()
    .getParameters({
      Names: ssmKeys.map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const secretsReducer = (acc: {}, curr: SSM.Parameter) => {
    let name = curr.Name;

    if (name.endsWith(tdConsumerKey)) {
      name = 'tdConsumerKey';
    }

    acc[name] = curr.Value;

    return acc;
  };

  const ssmConfig = Parameters.reduce(secretsReducer, {});

  return { ...config, ...ssmConfig };
};

let configInstance = null;

export default class Config {
  static async getConfig(): Promise<IConfig> {
    if (!configInstance) {
      configInstance = await getConfig();
    }

    return configInstance;
  }
}
