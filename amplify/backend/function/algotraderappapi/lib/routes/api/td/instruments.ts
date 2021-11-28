import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdInstrumentsRouter = new Router({ prefix: '/instruments' })
  .use(loadLoggerOptions('td/instruments.ts'))
  .get('Get instruments', '/', async (ctx: AppContext, _next: Next) => {
    const {
      query: { symbol, projection },
      state: { logger, loggerOptions },
    } = ctx;

    logger.info('Getting instruments for symbol', {
      ...loggerOptions,
      projection,
      symbol,
    });

    const { data, status } =
      await ctx.state.tdAmeritradeClient.instruments.getInstruments(
        symbol as string,
        projection as any
      );

    ctx.status = status;
    ctx.body = data;

    logger.info('Instruments for symbol retrieved', {
      ...loggerOptions,
      projection,
      symbol,
    });
  })
  .get('Get instrument', '/:cusip', async (ctx: AppContext, _next: Next) => {
    const {
      params: { cusip },
      state: { logger, loggerOptions },
    } = ctx;

    logger.info('Getting instrument by cusip', {
      ...loggerOptions,
      cusip,
    });

    const { data, status } =
      await ctx.state.tdAmeritradeClient.instruments.getInstrument(cusip);

    ctx.status = status;
    ctx.body = data;

    logger.info('Instrument for cusip retrieved', {
      ...loggerOptions,
      cusip,
    });
  });
