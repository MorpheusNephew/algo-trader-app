import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdSavedOrdersRouter = new Router({ prefix: '/saved-orders' })
  .use(loadLoggerOptions('td/savedOrders.ts'))
  .post(
    'Create saved order',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        request: { body: savedOrder },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId, savedOrder };

      logger.info('Creating saved order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.createSavedOrder(
          accountId,
          savedOrder
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Saved order created', updatedLoggerOptions);
    }
  )
  .get(
    'Get saved orders by account',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId };

      logger.info('Getting saved orders', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.getSavedOrdersByPath(
          accountId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Saved orders retrieved', updatedLoggerOptions);
    }
  )
  .get(
    'Get saved order',
    '/:accountId/:savedOrderId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, savedOrderId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        savedOrderId,
      };

      logger.info('Getting saved order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.getSavedOrder(
          accountId,
          savedOrderId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Saved order retrieved', updatedLoggerOptions);
    }
  )
  .put(
    'Replace saved order',
    '/:accountId/:savedOrderId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, savedOrderId },
        request: { body: replacementOrder },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        savedOrderId,
        replacementOrder,
      };

      logger.info('Replacing saved order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.replaceSavedOrder(
          accountId,
          savedOrderId,
          replacementOrder
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Saved order replaced', updatedLoggerOptions);
    }
  )
  .del(
    'Delete saved order',
    '/:accountId/:savedOrderId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, savedOrderId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        savedOrderId,
      };

      logger.info('Deleting saved order', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.savedOrders.deleteSavedOrder(
          accountId,
          savedOrderId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Saved order deleted', updatedLoggerOptions);
    }
  );
