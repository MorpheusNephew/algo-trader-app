const config = {
  cognitoUserPoolId: process.env.AUTH_ALGOTRADERAPP7860B9F7_USERPOOLID,
  lambdaEnv: process.env.ENV,
  lambdaRegion: process.env.REGION,
  brokerConnectionDbArn: process.env.STORAGE_BROKERCONNECTION_ARN,
  brokerConnectionDbName: process.env.STORAGE_BROKERCONNECTION_NAME,
  brokerConnectionDbStreamArn: process.env.STORAGE_BROKERCONNECTION_STREAMARN,
};

export default config;
