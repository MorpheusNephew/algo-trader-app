import { getLogger } from '../logger';
import { AppContext } from '../types';
import { Next } from 'koa';

export const loadLogger = async (ctx: AppContext, next: Next) => {
  ctx.state.logger = getLogger();
  ctx.state.logger.info('Logger loaded', { fileName: 'loadLogger.ts' });

  await next();
};
