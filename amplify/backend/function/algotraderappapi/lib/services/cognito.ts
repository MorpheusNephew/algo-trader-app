import { AuthenticatedUser } from '../types';
import { convertToAuthenticatedUser } from '../utils';
import { captureAWSv3Client } from 'aws-xray-sdk';
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = captureAWSv3Client(new CognitoIdentityProviderClient({}));

export const getCognitoUser = async (ctx: any): Promise<AuthenticatedUser> => {
  const cognitoAuthenticationProvider =
    ctx.req.requestContext?.identity?.cognitoAuthenticationProvider.split(',');

  const userInfo = cognitoAuthenticationProvider[1].split(':');
  const userSub = userInfo[userInfo.length - 1];

  const command = new ListUsersCommand({
    UserPoolId: ctx.state.config.cognitoUserPoolId,
    Filter: `sub = "${userSub}"`,
  });

  const { Users } = await client.send(command);

  return Users?.map(convertToAuthenticatedUser)[0];
};
