import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';
import {
  IOrdersByPathOptions,
  IOrdersByQueryOptions,
} from '@morpheusnephew/td-ameritrade/dist/clients/orders-client';

export const tdOrdersRouter = new Router({ prefix: '/orders' })
  .get('Get orders by query', '/', async (ctx: AppContext, _next: Next) => {
    const options = ctx.query as unknown as IOrdersByQueryOptions;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.orders.getOrdersByQuery(options);

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get(
    'Get orders by path',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId } = ctx.params;
      const options = ctx.query as unknown as IOrdersByPathOptions;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.getOrdersByPath(
          accountId,
          options
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .post('Place order', '/:accountId', async (ctx: AppContext, _next: Next) => {
    const { accountId } = ctx.params;

    const orderToCreate = ctx.request.body;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.orders.placeOrder(
        accountId,
        orderToCreate
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get(
    'Get order',
    '/:accountId/:orderId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, orderId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.getOrder(accountId, orderId);

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .put(
    'Replace order',
    '/:accountId/:orderId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, orderId } = ctx.params;
      const replacementOrder = ctx.request.body;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.replaceOrder(
          accountId,
          orderId,
          replacementOrder
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .del(
    'Cancel order',
    '/:accountId/:orderId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, orderId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.cancelOrder(
          accountId,
          orderId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  );
