import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

const getLoggerOptions = ({ method, path }: AppContext) => {
  return { fileName: 'companies/index.ts', method, path };
};

const companiesRouter = new Router({ prefix: '/companies' }).get(
  'get companies',
  '/',
  async (ctx: AppContext, _next: Next) => {
    const { logger } = ctx.state;

    const loggerOptions = getLoggerOptions(ctx);

    logger.info('Retrieving companies', { ...loggerOptions });
  }
);

export default companiesRouter;
