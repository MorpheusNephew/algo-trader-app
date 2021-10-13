import { AuthenticatedUser } from './types';
import { UserType } from '@aws-sdk/client-cognito-identity-provider';

export const convertToAuthenticatedUser = (
  user: UserType
): AuthenticatedUser => {
  const authenticatedUser: AuthenticatedUser = {
    username: user.Username,
  };

  user.Attributes.forEach((attribute) => {
    authenticatedUser[attribute.Name] = attribute.Value;
  });

  return authenticatedUser;
};
