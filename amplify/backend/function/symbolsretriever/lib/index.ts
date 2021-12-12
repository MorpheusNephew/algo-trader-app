import logger from './logger';
import { extractCompaniesInfo } from './utils';
import {
  deleteAllCompaniesInfo,
  upsertCompaniesInfo,
} from '/opt/nodejs/companydb';

export const handler = async (event: any) => {
  const { s3: s3EventRecord, eventName } = event.Records[0];

  if (eventName !== 'ObjectCreated:Put') {
    return;
  }

  await deleteAllCompaniesInfo();

  const bucket = s3EventRecord.bucket.name;
  const key = decodeURIComponent(s3EventRecord.object.key.replace(/\+/g, ' '));

  const input = {
    Bucket: bucket,
    Key: key,
  };

  logger.info('Getting ready to fill company symbols');
  const companiesInfo = await extractCompaniesInfo(input);
  await upsertCompaniesInfo(companiesInfo);

  return companiesInfo;
};
