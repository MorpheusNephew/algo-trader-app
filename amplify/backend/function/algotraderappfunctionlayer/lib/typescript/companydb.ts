import { putItem, TPutItemInput } from './dynamodb';
import logger from './logger';
import { marshall } from '@aws-sdk/util-dynamodb';

export const upsertCompanyInfo = async () => {
  logger.info('Upserting company info');

  const input: TPutItemInput = {
    Item: marshall({
      id: 'company',
      sortName: 'Symbol',
      companyName: 'Company Name',
    }),
  };

  return putItem(input);
};
