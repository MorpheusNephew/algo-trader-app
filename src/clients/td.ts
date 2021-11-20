import { Account, Mover } from '@morpheusnephew/td-ameritrade-models';
import { API } from 'aws-amplify';

const ALGO_API = 'algoappapi';

export const connectRequest = (redirectUrl: string, code?: string) => () => {
  return API.get(ALGO_API, '/api/connections/td/connect', {
    queryStringParameters: {
      redirectUrl,
      code,
    },
  });
};

export const getAccountsInformation = (): Promise<Account[]> => {
  return API.get(ALGO_API, '/api/td/accounts', null);
};

export const getAccountInformation = (
  accountId: string | number
): Promise<Account> => {
  return API.get(ALGO_API, `/api/td/accounts/${accountId}`, null);
};

export const getMovers = (
  index: string,
  direction?: string,
  change?: string
): Promise<Mover[]> => {
  return API.get(ALGO_API, `/api/td/movers/${index}`, {
    queryStringParameters: {
      direction,
      change,
    },
  });
};
