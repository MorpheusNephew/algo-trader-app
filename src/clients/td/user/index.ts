import { ALGO_API } from '../../types';
import { UserPrincipalField } from './types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { API } from 'aws-amplify';

const baseEndpoint = '/api/td/user';

export const getUserPrincipal = async (): Promise<UserPrincipal> => {
  const fields: UserPrincipalField[] = [
    'streamerSubscriptionKeys',
    'streamerConnectionInfo',
  ];

  return API.get(ALGO_API, `${baseEndpoint}/details`, {
    queryStringParameters: {
      fields,
    },
  });
};
