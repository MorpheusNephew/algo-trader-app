import Logger from '/opt/nodejs/logger';

export const getLogger = () => {
  return Logger.getLogger('refresh-token-refresher');
};
