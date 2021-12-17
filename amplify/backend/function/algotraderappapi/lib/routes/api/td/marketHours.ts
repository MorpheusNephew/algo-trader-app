import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdMarketHours = new Router({ prefix: '/market-hours' })
  .use(loadLoggerOptions('td/marketHours.ts'))
  .get(
    'Get hours for multiple markets',
    '/',
    async (ctx: AppContext, _next: Next) => {
      const {
        query: { markets, date },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, markets, date };

      logger.info('Getting hours for multiple markets', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.marketHours.getMultipleMarketHours(
          markets as any,
          date as any
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Hours for multiple markets retrieved', updatedLoggerOptions);
    }
  )
  .get(
    'Get hours for market',
    '/:market',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { market },
        query: { date },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, market, date };

      logger.info('Getting hours for market', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.marketHours.getMarketHours(
          market as any,
          date as any
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Hours for market retrieved', updatedLoggerOptions);
    }
  );
