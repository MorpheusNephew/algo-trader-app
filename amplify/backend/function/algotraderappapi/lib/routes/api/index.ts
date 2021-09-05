import checkUser from '../../middleware/checkUser';
import { AppContext } from '../../types';
import configurationRouter from './configurationRouter';
import connectionsRouter from './connections';
import tdRouter from './td';
import Router from '@koa/router';
import { Next } from 'koa';

const apiRouter = new Router({ prefix: '/api' })
  .use(checkUser)
  .get('greeting', '/', async (ctx: AppContext, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}!`
    );

    await next();
  })
  .use(configurationRouter.routes())
  .use(connectionsRouter.routes())
  .use(tdRouter.routes());

export default apiRouter;