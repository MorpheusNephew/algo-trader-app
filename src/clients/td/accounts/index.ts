import { ALGO_API } from '../../types';
import { Account } from '@morpheusnephew/td-ameritrade-models';
import { API } from 'aws-amplify';

const baseEndpoint = '/api/td/accounts';

export const getAccountsInformation = (): Promise<Account[]> => {
  return API.get(ALGO_API, baseEndpoint, null);
};

export const getAccountInformation = (
  accountId: string | number
): Promise<Account> => {
  return API.get(ALGO_API, `${baseEndpoint}/${accountId}`, null);
};
