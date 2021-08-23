import { AppContext } from '../types';
import configurationRouter from './configurationRouter';
import connectionsRouter from './connectionsRouter';
import Router from '@koa/router';
import { Next } from 'koa';

const router = new Router({ prefix: '/api' })
  .get('greeting', '/', async (ctx: AppContext, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}!`
    );

    await next();
  })
  .use(configurationRouter.routes())
  .use(connectionsRouter.routes());

export default router;
