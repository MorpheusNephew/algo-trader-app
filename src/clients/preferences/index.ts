import { TBrokerage } from '../../types';
import { ALGO_API } from '../types';
import { API } from 'aws-amplify';

const baseEndpoint = '/api/preferences';

export const getPreferences = async (brokerage: TBrokerage): Promise<any> => {
  return API.get(ALGO_API, `${baseEndpoint}/${brokerage}`, null);
};

export const savePreferences = async (
  brokerage: TBrokerage,
  preferences: any
): Promise<any> => {
  return API.post(ALGO_API, `${baseEndpoint}/${brokerage}`, {
    body: preferences,
  });
};
