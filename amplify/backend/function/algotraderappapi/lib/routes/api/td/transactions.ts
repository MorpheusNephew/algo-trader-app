import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdTransactionsRouter = new Router({ prefix: '/transactions' })
  .use(loadLoggerOptions('td/transactions.ts'))
  .get(
    'Get transactions',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        query: { type, symbol, startDate, endDate },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        type,
        symbol,
        startDate,
        endDate,
      };

      logger.info('Getting transactions for account', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.transactionHistory.getTransactions(
          accountId,
          type as any,
          symbol as string,
          startDate as any,
          endDate as any
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Account transactions retrieved', updatedLoggerOptions);
    }
  )
  .get(
    'Get transaction',
    '/:accountId/:transactionId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, transactionId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        transactionId,
      };

      logger.info('Getting transaction', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.transactionHistory.getTransaction(
          accountId,
          transactionId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Transaction retrieved', updatedLoggerOptions);
    }
  );
