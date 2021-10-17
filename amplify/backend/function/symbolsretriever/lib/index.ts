import { CompanyInfo } from './nasdaq/types';
import { getSymbolsUrl } from './nasdaq/urls';
import { getCompanyInfo } from './puppeteer';

export const handler = async (_event: any) => {
  console.log('Getting ready to fill company symbols');
  const companyInfo = await getCompanyInfo(getSymbolsUrl());

  const symbols = companyInfo
    .map(({ symbol }: CompanyInfo) => symbol)
    .filter((symbol) => !(symbol.includes('^') || symbol.includes('/')));

  console.log('Company info from puppeteer', JSON.stringify(companyInfo));
  console.log('Company symbols', JSON.stringify(symbols));

  return 'We made it';
};
