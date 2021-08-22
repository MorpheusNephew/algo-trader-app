import { AppContext } from '../types';
import Router from '@koa/router';
import { Next } from 'koa';

const configurationRouter = new Router({ prefix: '/configuration' }).get(
  'all configs',
  '/',
  async (ctx: AppContext, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify('Congratulations I guess');

    await next();
  }
);

export default configurationRouter;
