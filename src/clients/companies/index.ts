import { ICompany } from '../../types';
import { ALGO_API } from '../types';
import { API } from 'aws-amplify';

export const getCompanies = async (): Promise<ICompany[]> => {
  return API.get(ALGO_API, '/api/companies', null);
};
