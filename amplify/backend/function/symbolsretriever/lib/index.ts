import { CompanyInfo } from './nasdaq/types';
import { getSymbolsUrl } from './nasdaq/urls';
import { getCompanyInfo } from './puppeteer';
import Logger from '/opt/nodejs/logger';

const logger = Logger.getLogger('symbols-retriever');

export const handler = async (_event: any) => {
  logger.info('Getting ready to fill company symbols');
  const companyInfo = await getCompanyInfo(getSymbolsUrl());

  const symbols = companyInfo
    .map(({ symbol }: CompanyInfo) => symbol)
    .filter((symbol) => !(symbol.includes('^') || symbol.includes('/')));

  logger.info('Company symbols', JSON.stringify(symbols));

  return;
};
