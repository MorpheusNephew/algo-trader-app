import { AuthenticatedUser } from '../types';
import { convertToAuthenticatedUser } from '../utils';
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export const getCognitoUser = async (ctx: any): Promise<AuthenticatedUser> => {
  const cognitoAuthenticationProvider =
    ctx.req.requestContext?.identity?.cognitoAuthenticationProvider.split(',');

  const userInfo = cognitoAuthenticationProvider[1].split(':');
  const userSub = userInfo[userInfo.length - 1];

  const client = new CognitoIdentityProviderClient({});
  const command = new ListUsersCommand({
    UserPoolId: ctx.state.config.cognitoUserPoolId,
    Filter: `sub = "${userSub}"`,
  });

  const { Users } = await client.send(command);

  return Users?.map(convertToAuthenticatedUser)[0];
};
