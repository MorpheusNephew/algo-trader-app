import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdUserRouter = new Router({ prefix: '/user' })
  .get('/:accountId/preferences', async (ctx: AppContext, _next: Next) => {
    const { accountId } = ctx.params;

    const { data: preferences, status } =
      await ctx.state.tdAmeritradeClient.userInfo.getPreferences(accountId);

    ctx.status = status;
    ctx.body = JSON.stringify(preferences);
  })
  .put('/:accountId/preferences', async (ctx: AppContext, _next: Next) => {
    const { accountId } = ctx.params;

    const updatedPreferences = ctx.request.body;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.userInfo.updatePreferences(
        accountId,
        updatedPreferences as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get('/details', async (ctx: AppContext, _next: Next) => {
    const { fields } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.userInfo.getUserPrincipals(
        fields as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get('/subscription-keys', async (ctx: AppContext, _next: Next) => {
    const { accountIds } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.userInfo.getStreamerSubscriptionKeys(
        accountIds as any
      );

    ctx.status = status;
    ctx.body = data;
  });
