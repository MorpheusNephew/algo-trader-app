import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdMoversRouter = new Router({ prefix: '/movers' }).get(
  'Get movers',
  '/:index',
  async (ctx: AppContext, _next: Next) => {
    const { index } = ctx.params;
    const { change, direction } = ctx.query;

    const { data, status } =
      await ctx.state.tdAmeritradeClient.movers.getMovers(
        index,
        direction as any,
        change as any
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);
  }
);
