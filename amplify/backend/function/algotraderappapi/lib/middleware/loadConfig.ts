import { AppContext } from '../types';
import { Config } from '/opt/nodejs/config';
import { Next } from 'koa';

const loggerOptions = {
  fileName: 'loadConfig.ts',
};

export const loadConfig = async (ctx: AppContext, next: Next) => {
  const { logger } = ctx.state;
  logger.info('Loading config', loggerOptions);
  ctx.state.config = await Config.getConfig();
  logger.info('Config loaded', loggerOptions);

  await next();
};
