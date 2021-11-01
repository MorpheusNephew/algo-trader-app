import logger from '../logger';
import { CompanyInfo, CompanyInfoResponse } from '../nasdaq/types';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const getBrowser = async () => {
  logger.info('Getting browser');

  return puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

export const getCompaniesInfo = async (
  pageUrl: string
): Promise<CompanyInfo[]> => {
  const browser = await getBrowser();

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
  );

  logger.info('Going to page to get ticker symbols', { pageUrl });

  const response = await page.goto(pageUrl);

  logger.info('Getting symbols from JSON');

  const {
    data: {
      table: { rows: companies },
    },
  }: CompanyInfoResponse = await response.json();

  logger.info('Closing browser');

  await browser.close();

  return companies.map(({ name, symbol }) => ({ name, symbol }));
};
