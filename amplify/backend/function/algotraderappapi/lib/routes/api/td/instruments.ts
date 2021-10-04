import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdInstrumentsRouter = new Router({ prefix: '/instruments' })
  .get('Get instruments', '/', async (ctx: AppContext, _next: Next) => {
    const { symbol, projection } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.instruments.getInstruments(
        symbol as string,
        projection as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get('Get instrument', '/:cusip', async (ctx: AppContext, _next: Next) => {
    const { cusip } = ctx.params;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.instruments.getInstrument(cusip);

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });
