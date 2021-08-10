import config from '../config';
import { convertToAuthenticatedUser } from '../utils';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Next } from 'koa';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

const checkUser = async (ctx: any, next: Next) => {
  const cognitoAuthenticationProvider =
    ctx.req.requestContext?.identity?.cognitoAuthenticationProvider.split(',');

  const userInfo = cognitoAuthenticationProvider[1].split(':');
  const userSub = userInfo[userInfo.length - 1];

  const request: CognitoIdentityServiceProvider.ListUsersRequest = {
    UserPoolId: config.cognitoUserPoolId,
    Filter: `sub = "${userSub}"`,
  };

  const response = await cognitoIdentityServiceProvider
    .listUsers(request)
    .promise();

  const authenticatedUser = response.Users.map(convertToAuthenticatedUser)[0];

  if (!authenticatedUser) {
    ctx.throw('User not found', 404);
  }

  console.log('User', JSON.stringify(authenticatedUser));

  ctx.state.authenticatedUser = authenticatedUser;

  await next();
};

export default checkUser;
