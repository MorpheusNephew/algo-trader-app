import { AuthenticatedUser } from '../types';
import { convertToAuthenticatedUser } from '../utils';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

export const getCognitoUser = async (ctx: any): Promise<AuthenticatedUser> => {
  const cognitoAuthenticationProvider =
    ctx.req.requestContext?.identity?.cognitoAuthenticationProvider.split(',');

  const userInfo = cognitoAuthenticationProvider[1].split(':');
  const userSub = userInfo[userInfo.length - 1];

  const request: CognitoIdentityServiceProvider.ListUsersRequest = {
    UserPoolId: ctx.state.config.cognitoUserPoolId,
    Filter: `sub = "${userSub}"`,
  };

  const response = await cognitoIdentityServiceProvider
    .listUsers(request)
    .promise();

  return response.Users.map(convertToAuthenticatedUser)[0];
};
