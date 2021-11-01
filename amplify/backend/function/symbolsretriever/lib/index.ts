import logger from './logger';
import { getSymbolsUrl } from './nasdaq/urls';
import { getCompaniesInfo } from './puppeteer';

export const handler = async (_event: any) => {
  logger.info('Getting ready to fill company symbols');
  const companiesInfo = await getCompaniesInfo(getSymbolsUrl());

  logger.info('Companies info', {
    companiesInfo: JSON.stringify(companiesInfo),
  });

  return;
};
