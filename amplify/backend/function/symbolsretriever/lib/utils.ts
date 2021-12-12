import logger from './logger';
import { CompanyInfo } from '/opt/nodejs/types';
import { captureAWSv3Client } from 'aws-xray-sdk';
import csv from 'csvtojson';
import { Response } from 'node-fetch-commonjs';
import { Readable } from 'stream';
import {
  GetObjectCommand,
  GetObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

export const isAlpha = (str: string) => /^[a-zA-Z]*$/.test(str);

const client = captureAWSv3Client(new S3Client({}));

export const extractCompaniesInfo = async (
  input: GetObjectCommandInput
): Promise<CompanyInfo[]> => {
  const command = new GetObjectCommand(input);

  const file = await client.send(command);

  const response = new Response(file.Body as Readable);
  const data = await response.text();

  const companies = await extractCompanies(data);

  return companies
    .map(({ Name, Symbol }) => ({ name: Name, symbol: Symbol }))
    .filter(({ symbol }) => isAlpha(symbol))
    .slice(0, 3000);
};

const extractCompanies = async (data: string) => {
  logger.info('Extracting companies from data', { data });

  const rows = await csv().fromString(data);

  return rows.sort(sortTicker);
};

const sortTicker = (companyA: any, companyB: any) => {
  const companyAMarketCap = companyA['Market Cap'];
  const companyBMarketCap = companyB['Market Cap'];

  return companyBMarketCap - companyAMarketCap;
};
