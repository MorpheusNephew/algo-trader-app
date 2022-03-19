import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { PriceHistoryOptions } from '@morpheusnephew/td-ameritrade/clients/price-history-client';
import { Next } from 'koa';

export const tdPriceHistoryRouter = new Router({
  prefix: '/price-history',
})
  .use(loadLoggerOptions('td/priceHistory.ts'))
  .get(
    'Get price history',
    '/:symbol',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { symbol },
        state: { logger, loggerOptions },
      } = ctx;
      const priceHistoryOptions = ctx.query as unknown as PriceHistoryOptions;

      const updatedLoggerOptions = {
        ...loggerOptions,
        symbol,
        priceHistoryOptions,
      };

      logger.info('Getting price history for symbol', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.priceHistory.getPriceHistory(
          symbol,
          priceHistoryOptions
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Price history for symbol retrieved', updatedLoggerOptions);
    }
  );
