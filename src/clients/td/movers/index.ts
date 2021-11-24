import { ALGO_API } from '../../types';
import { Mover } from '@morpheusnephew/td-ameritrade-models';
import { API } from 'aws-amplify';

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
