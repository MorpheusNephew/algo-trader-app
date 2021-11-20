import { Account } from '@morpheusnephew/td-ameritrade-models';
import { API } from 'aws-amplify';

export const connectRequest = (redirectUrl: string, code?: string) => () => {
  return API.get('algoappapi', '/api/connections/td/connect', {
    queryStringParameters: {
      redirectUrl,
      code,
    },
  });
};

export const getAccountsInformation = (): Promise<Account[]> => {
  return API.get('algoappapi', '/api/td/accounts', null);
};

export const getAccountInformation = (
  accountId: string | number
): Promise<Account> => {
  return API.get('algoappapi', `/api/td/accounts/${accountId}`, null);
};
