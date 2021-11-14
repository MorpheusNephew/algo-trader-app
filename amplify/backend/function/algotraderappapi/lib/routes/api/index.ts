import { loadUser } from '../../middleware/loadUser';
import { AppContext } from '../../types';
import connectionsRouter from './connections';
import { tdRouter } from './td';
import Router from '@koa/router';
import { Next } from 'koa';

const apiRouter = new Router({ prefix: '/api' })
  .use(loadUser)
  .get('greeting', '/', async (ctx: AppContext, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}!`
    );

    await next();
  })
  .use(connectionsRouter.routes())
  .use(tdRouter.routes());

export default apiRouter;
