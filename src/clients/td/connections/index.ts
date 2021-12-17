import { ALGO_API } from '../../types';
import { API } from 'aws-amplify';

export const connectRequest = (redirectUrl: string, code?: string) => () => {
  return API.get(ALGO_API, '/api/connections/td/connect', {
    queryStringParameters: {
      redirectUrl,
      code,
    },
  });
};
