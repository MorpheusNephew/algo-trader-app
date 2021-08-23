import { AppContext } from '../types';
import Router from '@koa/router';
import { Next } from 'koa';

const connectionsRouter = new Router({ prefix: '/connections' })
  .get('Get connections', '/', async (ctx: AppContext, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Getting all of ${ctx.state.authenticatedUser.username}'s connections`
    );

    await next();
  })
  .post('Creating connection', '/', async (ctx: AppContext, next: Next) => {
    ctx.status = 201;
    ctx.body = JSON.stringify(
      `Creating connection for ${ctx.state.authenticatedUser.username}`
    );

    await next();
  })
  .del('Delete connection', '/:id', async (ctx: AppContext, next: Next) => {
    ctx.status = 204;
    ctx.body = JSON.stringify(
      `Deleting connection id (${ctx.params.id}) for ${ctx.state.authenticatedUser.username}`
    );

    await next();
  });

export default connectionsRouter;
