import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdTransactionsRouter = new Router({ prefix: '/transactions' })
  .get(
    'Get transactions',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId } = ctx.params;
      const { type, symbol, startDate, endDate } = ctx.query;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.transactionHistory.getTransactions(
          accountId,
          type as any,
          symbol as string,
          startDate as any,
          endDate as any
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .get(
    'Get transaction',
    '/:accountId/:transactionId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, transactionId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.transactionHistory.getTransaction(
          accountId,
          transactionId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  );
