import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdMoversRouter = new Router({ prefix: '/movers' })
  .use(loadLoggerOptions('td/movers.ts'))
  .get('Get movers', '/:index', async (ctx: AppContext, _next: Next) => {
    const {
      params: { index },
      query: { change, direction },
      state: { logger, loggerOptions },
    } = ctx;

    const updatedLoggerOptions = { ...loggerOptions, index, change, direction };

    logger.info('Getting movers', updatedLoggerOptions);

    const { data, status } =
      await ctx.state.tdAmeritradeClient.movers.getMovers(
        index,
        direction as any,
        change as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);

    logger.info('Movers retrieved', updatedLoggerOptions);
  });
