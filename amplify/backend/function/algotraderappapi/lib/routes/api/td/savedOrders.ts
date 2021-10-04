import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdSavedOrdersRouter = new Router({ prefix: '/saved-orders' })
  .post(
    'Create saved order',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId } = ctx.params;
      const savedOrder = ctx.request.body;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.createSavedOrder(
          accountId,
          savedOrder
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .get(
    'Get saved orders by path',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.getSavedOrdersByPath(
          accountId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .get(
    'Get saved order',
    '/:accountId/:savedOrderId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, savedOrderId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.getSavedOrder(
          accountId,
          savedOrderId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .put(
    'Replace saved order',
    '/:accountId/:savedOrderId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, savedOrderId } = ctx.params;
      const replacementOrder = ctx.request.body;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.replaceSavedOrder(
          accountId,
          savedOrderId,
          replacementOrder
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .del(
    'Delete saved order',
    '/:accountId/:savedOrderId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, savedOrderId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.deleteSavedOrder(
          accountId,
          savedOrderId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  );
