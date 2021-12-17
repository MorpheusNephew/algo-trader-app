export type AmplifyDependentResourcesAttributes = {
  auth: {
    algotraderapp7860b9f7: {
      IdentityPoolId: 'string';
      IdentityPoolName: 'string';
      UserPoolId: 'string';
      UserPoolArn: 'string';
      UserPoolName: 'string';
      AppClientIDWeb: 'string';
      AppClientID: 'string';
      CreatedSNSRole: 'string';
    };
  };
  function: {
    algotraderappapi: {
      Name: 'string';
      Arn: 'string';
      Region: 'string';
      LambdaExecutionRole: 'string';
    };
    algotraderappdependencieslayer: {
      Arn: 'string';
    };
    algotraderappfunctionlayer: {
      Arn: 'string';
    };
    tdrefreshtokenrefresher: {
      Name: 'string';
      Arn: 'string';
      Region: 'string';
      LambdaExecutionRole: 'string';
      CloudWatchEventRule: 'string';
    };
    symbolsretriever: {
      Name: 'string';
      Arn: 'string';
      Region: 'string';
      LambdaExecutionRole: 'string';
    };
  };
  api: {
    algoappapi: {
      RootUrl: 'string';
      ApiName: 'string';
      ApiId: 'string';
    };
  };
  storage: {
    algotradertable: {
      Name: 'string';
      Arn: 'string';
      StreamArn: 'string';
      PartitionKeyName: 'string';
      PartitionKeyType: 'string';
      SortKeyName: 'string';
      SortKeyType: 'string';
      Region: 'string';
    };
    AlgoTraderAppBucket: {
      BucketName: 'string';
      Region: 'string';
    };
  };
};
