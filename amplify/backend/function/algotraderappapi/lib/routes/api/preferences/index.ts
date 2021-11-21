import { AppContext } from '../../../types';
import Router from '@koa/router';
import { TBrokerage } from '/opt/nodejs/types';
import { Next } from 'koa';

const getLoggerOptions = ({ method, path }: AppContext) => {
  return { fileName: 'preferences/index.ts', method, path };
};

const preferencesRouter = new Router({ prefix: '/preferences' })
  .post(
    'save preferences',
    '/:brokerage',
    async (ctx: AppContext, _next: Next) => {
      const { logger } = ctx.state;
      const { brokerage }: { brokerage: TBrokerage } = ctx.params;

      const loggerOptions = getLoggerOptions(ctx);

      logger.info('Saving user preferences', { ...loggerOptions, brokerage });
    }
  )
  .get(
    'get preferences',
    '/:brokerage',
    async (ctx: AppContext, _next: Next) => {
      const { logger } = ctx.state;
      const { brokerage }: { brokerage: TBrokerage } = ctx.params;

      const loggerOptions = getLoggerOptions(ctx);

      logger.info('Getting user preferences', { ...loggerOptions, brokerage });
    }
  );

export default preferencesRouter;
