import checkUser from '../../middleware/checkUser';
import { AppContext } from '../../types';
import configurationRouter from './configurationRouter';
import connectionsRouter from './connections';
import tdRouter from './td';
import Router from '@koa/router';
import { helloRandom } from '/opt/nodejs/hey';
import { Next } from 'koa';

const apiRouter = new Router({ prefix: '/api' })
  .use(checkUser)
  .get('greeting', '/', async (ctx: AppContext, next: Next) => {
    let heyRandom: string;

    if (helloRandom) {
      heyRandom = helloRandom();
    }

    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}!\n${heyRandom}`
    );

    await next();
  })
  .use(configurationRouter.routes())
  .use(connectionsRouter.routes())
  .use(tdRouter.routes());

export default apiRouter;
