import { batchWriteItem, TPutItemInput } from './dynamodb';
import logger from './logger';
import { CompanyInfo } from './types';
import { PutRequest } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { chunk } from 'lodash';
import pMap from 'p-map';

const CHUNK = 25;

export const upsertCompaniesInfo = async (companiesInfo: CompanyInfo[]) => {
  logger.info('Upserting companies info', { companiesInfo });

  const companiesInfoChunks = chunk(companiesInfo, CHUNK);

  const upsertCompaniesInfoMapper = async (companies: CompanyInfo[]) => {
    const putRequest: PutRequest[] = companies.map((company) => ({
      Item: marshall({
        id: `company:${company.symbol}`,
        sortName: company.symbol,
        companyName: company.name,
      }),
    }));

    return batchWriteItem(putRequest);
  };

  return pMap(companiesInfoChunks, upsertCompaniesInfoMapper);
};
