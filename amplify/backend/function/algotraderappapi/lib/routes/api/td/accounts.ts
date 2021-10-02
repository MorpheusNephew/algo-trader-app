import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdAccountsRouter = new Router({ prefix: '/accounts' })
  .get('/', async (ctx: AppContext, _next: Next) => {
    const { fields } = ctx.query;

    const accounts = await ctx.state.tdAmeritradeClient.accounts.getAllAccounts(
      fields as any
    );

    ctx.status = 200;
    ctx.body = JSON.stringify(accounts);
  })
  .get('/:accountId', async (ctx: AppContext, _next: Next) => {
    const { accountId } = ctx.params;
    const { fields } = ctx.query;

    const account = await ctx.state.tdAmeritradeClient.accounts.getAccount(
      accountId,
      fields as any
    );

    if (!account) {
      ctx.status = 404;
      ctx.body = JSON.stringify(`Account (${accountId}) not found`);
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(account);
    }
  });
