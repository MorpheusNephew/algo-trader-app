import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdQuotesRouter = new Router({ prefix: '/quotes' })
  .get('Get quotes', '/', async (ctx: AppContext, _next: Next) => {
    const { symbol } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.quotes.getQuotes(symbol as any);

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  })
  .get('Get quote', '/:symbol', async (ctx: AppContext, _next: Next) => {
    const { symbol } = ctx.params;

    const { data, status } = await ctx.state.tdAmeritradeClient.quotes.getQuote(
      symbol
    );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });
