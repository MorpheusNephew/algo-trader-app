import { batchWriteItem } from './dynamodb';
import logger from './logger';
import { CompanyInfo } from './types';
import { PutRequest } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { chunk } from 'lodash';

const CHUNK = 25;

export const upsertCompaniesInfo = async (companiesInfo: CompanyInfo[]) => {
  logger.info('Upserting companies info', { companiesInfo });

  const companiesInfoChunks = chunk(companiesInfo, CHUNK);

  const upsertCompaniesInfoMapper = async (companies: CompanyInfo[]) => {
    const putRequest: PutRequest[] = companies.map((company) => ({
      Item: marshall({
        id: `company`,
        sortName: company.symbol,
        companyName: company.name,
        rowType: `company:${company.symbol}`,
      }),
    }));

    return batchWriteItem(putRequest);
  };

  return Promise.all(companiesInfoChunks.map(upsertCompaniesInfoMapper));
};
