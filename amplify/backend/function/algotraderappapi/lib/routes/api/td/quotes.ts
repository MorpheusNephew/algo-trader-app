import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdQuotesRouter = new Router({ prefix: '/quotes' })
  .use(loadLoggerOptions('td/quotes.ts'))
  .get('Get quotes', '/', async (ctx: AppContext, _next: Next) => {
    const {
      query: { symbol },
      state: { logger, loggerOptions },
    } = ctx;

    const updatedLoggerOptions = { ...loggerOptions, symbol };

    logger.info('Getting quotes', updatedLoggerOptions);

    const { data, status } =
      await ctx.state.tdAmeritradeClient.quotes.getQuotes(symbol as any);

    ctx.status = status;
    ctx.body = data;

    logger.info('Quotes retrieved', updatedLoggerOptions);
  })
  .get('Get quote', '/:symbol', async (ctx: AppContext, _next: Next) => {
    const {
      params: { symbol },
      state: { logger, loggerOptions },
    } = ctx;

    const updatedLoggerOptions = { ...loggerOptions, symbol };

    logger.info('Get quote', updatedLoggerOptions);

    const { data, status } = await ctx.state.tdAmeritradeClient.quotes.getQuote(
      symbol
    );

    ctx.status = status;
    ctx.body = data;

    logger.info('Quote retrieved', updatedLoggerOptions);
  });
