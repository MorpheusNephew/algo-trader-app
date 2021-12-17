import { loadUser } from '../../middleware/loadUser';
import { AppContext } from '../../types';
import companiesRouter from './companies';
import connectionsRouter from './connections';
import preferencesRouter from './preferences';
import { tdRouter } from './td';
import Router from '@koa/router';
import { Next } from 'koa';

const apiRouter = new Router({ prefix: '/api' })
  .use(loadUser)
  .get('greeting', '/', async (ctx: AppContext, _next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}!`
    );
  })
  .use(connectionsRouter.routes())
  .use(tdRouter.routes())
  .use(companiesRouter.routes())
  .use(preferencesRouter.routes());

export default apiRouter;
