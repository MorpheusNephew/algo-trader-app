import { ALGO_API } from '../../types';
import { UserPrincipalField } from './types';
import { API } from 'aws-amplify';

const baseEndpoint = '/api/td/user';

export const getUserDetails = async () => {
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
