import Logger from '/opt/nodejs/logger';

export const getLogger = () => {
  return Logger.getLogger('algo-trader-api');
};
