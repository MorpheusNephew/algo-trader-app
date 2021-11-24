import { ALGO_API } from '../../types';
import { API } from 'aws-amplify';

const baseEndpoint = '/api/td/user';

export const getUserDetails = async () => {
  return API.get(ALGO_API, `${baseEndpoint}/details`, null);
};
