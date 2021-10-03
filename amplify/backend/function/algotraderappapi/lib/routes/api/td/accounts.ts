import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdAccountsRouter = new Router({ prefix: '/accounts' })
  .get('/', async (ctx: AppContext, _next: Next) => {
    const { fields } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.accounts.getAllAccounts(fields as any);

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get('/:accountId', async (ctx: AppContext, _next: Next) => {
    const { accountId } = ctx.params;
    const { fields } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.accounts.getAccount(
        accountId,
        fields as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });
