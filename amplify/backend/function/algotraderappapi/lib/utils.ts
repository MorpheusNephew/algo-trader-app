import { AuthenticatedUser } from './types';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

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

export const getDateSecondsFromNow = (seconds: number): string => {
  const currentDate = new Date();
  currentDate.setSeconds(currentDate.getSeconds() + seconds);

  return currentDate.toISOString();
};
