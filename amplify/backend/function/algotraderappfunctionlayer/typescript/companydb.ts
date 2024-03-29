import logger from './logger';
import { CompanyInfo } from './types';
import { PutRequest } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { chunk } from 'lodash';
import {
  batchWriteItem,
  deleteItem,
  query,
  TDeleteItemInput,
  TQueryInput,
} from './dynamodb';

const CHUNK = 25;

export const deleteAllCompaniesInfo = async (): Promise<void> => {
  const companies = await getCompaniesInfo();

  logger.info('Deleting all companies info');

  await Promise.all(
    companies.map(({ symbol }) => {
      const input: TDeleteItemInput = {
        Key: marshall({ id: 'company', sortName: symbol }),
      };

      return deleteItem(input);
    })
  );
};

export const getCompaniesInfo = async (): Promise<CompanyInfo[]> => {
  logger.info('Getting companies info');

  const input: TQueryInput = {
    ExpressionAttributeValues: marshall({ ':id': 'company' }),
    KeyConditionExpression: 'id = :id',
  };

  const { Items } = await query(input);

  return Items.map((item) => {
    const { companyName, sortName } = unmarshall(item);

    return {
      name: companyName,
      symbol: sortName,
    };
  });
};

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

    logger.info('Batch writing companies', { companies });

    return batchWriteItem(putRequest);
  };

  return Promise.all(companiesInfoChunks.map(upsertCompaniesInfoMapper));
};
