import { CompanyInfo, CompanyInfoResponse } from '../nasdaq/types';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const getBrowser = async () => {
  return puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

export const getCompanyInfo = async (
  pageUrl: string
): Promise<CompanyInfo[]> => {
  const browser = await getBrowser();

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
  );

  const response = await page.goto(pageUrl);

  const {
    data: {
      table: { rows },
    },
  }: CompanyInfoResponse = await response.json();

  await browser.close();

  return rows;
};
