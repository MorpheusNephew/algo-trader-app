import { AppContext } from '../../../types';
import Router from '@koa/router';
import { PriceHistoryOptions } from '@morpheusnephew/td-ameritrade/dist/clients/price-history-client';
import { Next } from 'koa';

export const tdPriceHistoryRouter = new Router({
  prefix: '/price-history',
}).get(
  'Get price history',
  '/:symbol',
  async (ctx: AppContext, _next: Next) => {
    const { symbol } = ctx.params;
    const options = ctx.query as unknown as PriceHistoryOptions;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.priceHistory.getPriceHistory(
        symbol,
        options
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  }
);
