import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';
import {
  IOrdersByPathOptions,
  IOrdersByQueryOptions,
} from '@morpheusnephew/td-ameritrade/dist/clients/orders-client';

export const tdOrdersRouter = new Router({ prefix: '/orders' })
  .use(loadLoggerOptions('td/orders.ts'))
  .get('Get orders by query', '/', async (ctx: AppContext, _next: Next) => {
    const ordersByQueryOptions = ctx.query as unknown as IOrdersByQueryOptions;
    const { logger, loggerOptions } = ctx.state;

    const updatedLoggerOptions = { ...loggerOptions, ordersByQueryOptions };

    logger.info('Getting orders by query', updatedLoggerOptions);

    const { data, status } =
      await ctx.state.tdAmeritradeClient.orders.getOrdersByQuery(
        ordersByQueryOptions
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);

    logger.info('Orders by query retrieved', updatedLoggerOptions);
  })
  .get(
    'Get orders by path',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        state: { logger, loggerOptions },
      } = ctx;

      const ordersByPathOptions = ctx.query as unknown as IOrdersByPathOptions;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        ordersByPathOptions,
      };

      logger.info('Getting orders by path', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.getOrdersByPath(
          accountId,
          ordersByPathOptions
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);

      logger.info('Orders by path retrieved', updatedLoggerOptions);
    }
  )
  .post('Place order', '/:accountId', async (ctx: AppContext, _next: Next) => {
    const {
      params: { accountId },
      request: { body: orderToCreate },
      state: { logger, loggerOptions },
    } = ctx;

    const updatedLoggerOptions = { ...loggerOptions, accountId, orderToCreate };

    logger.info('Placing order', updatedLoggerOptions);

    const { data, status } =
      await ctx.state.tdAmeritradeClient.orders.placeOrder(
        accountId,
        orderToCreate
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);

    logger.info('Order placed', updatedLoggerOptions);
  })
  .get(
    'Get order',
    '/:accountId/:orderId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, orderId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId, orderId };

      logger.info('Getting order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.getOrder(accountId, orderId);

      ctx.status = status;
      ctx.body = JSON.stringify(data);

      logger.info('Order retrieved', updatedLoggerOptions);
    }
  )
  .put(
    'Replace order',
    '/:accountId/:orderId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, orderId },
        request: { body: replacementOrder },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        orderId,
        replacementOrder,
      };

      logger.info('Replacing order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.replaceOrder(
          accountId,
          orderId,
          replacementOrder
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);

      logger.info('Order replaced', updatedLoggerOptions);
    }
  )
  .del(
    'Cancel order',
    '/:accountId/:orderId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, orderId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId, orderId };

      logger.info('Canceling order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.orders.cancelOrder(
          accountId,
          orderId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);

      logger.info('Order canceled', updatedLoggerOptions);
    }
  );
