import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdMarketHours = new Router({ prefix: '/market-hours' })
  .get(
    'Get hours for multiple markets',
    '/',
    async (ctx: AppContext, _next: Next) => {
      const { markets, date } = ctx.query;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.marketHours.getMultipleMarketHours(
          markets as any,
          date as any
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .get(
    'Get hours for market',
    '/:market',
    async (ctx: AppContext, _next: Next) => {
      const { market } = ctx.params;
      const { date } = ctx.query;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.marketHours.getMarketHours(
          market as any,
          date as any
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  );
