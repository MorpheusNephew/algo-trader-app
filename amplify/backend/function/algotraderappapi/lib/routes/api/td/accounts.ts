import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdAccountsRouter = new Router({ prefix: '/accounts' })
  .use(loadLoggerOptions('td/accounts.ts'))
  .get('/', async (ctx: AppContext, _next: Next) => {
    const {
      query: { fields },
      state: { logger, loggerOptions },
    } = ctx;

    logger.info('Getting accounts', { ...loggerOptions, fields });

    const { data, status } =
      await ctx.state.tdAmeritradeClient.accounts.getAllAccounts(fields as any);

    ctx.status = status;
    ctx.body = JSON.stringify(data);

    logger.info('Accounts retrieved', loggerOptions);
  })
  .get('/:accountId', async (ctx: AppContext, _next: Next) => {
    const {
      params: { accountId },
      query: { fields },
      state: { logger, loggerOptions },
    } = ctx;

    logger.info('Getting account', { ...loggerOptions, accountId, fields });

    const { data, status } =
      await ctx.state.tdAmeritradeClient.accounts.getAccount(
        accountId,
        fields as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);

    logger.info('Account retrieved', { ...loggerOptions, accountId });
  });
