import logger from './logger';
import { getSymbolsUrl } from './nasdaq/urls';
import { getCompaniesInfo } from './puppeteer';
import { upsertCompaniesInfo } from '/opt/nodejs/companydb';

export const handler = async (_event: any) => {
  logger.info('Getting ready to fill company symbols');
  const companiesInfo = await getCompaniesInfo(getSymbolsUrl());

  await upsertCompaniesInfo(companiesInfo);
};
