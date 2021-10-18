import { getLogger } from '../logger';
import { AppContext } from '../types';
import { Next } from 'koa';

export const loadLogger = async (ctx: AppContext, next: Next) => {
  const logger = getLogger();
  ctx.state.logger = logger;
  logger.info('Logger loaded', { fileName: 'loadLogger.ts' });

  await next();
};
