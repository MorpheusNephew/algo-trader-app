import { AppContext } from '../types';
import Router from '@koa/router';
import { Next } from 'koa';

const connectionsRouter = new Router({ prefix: '/connections' })
  .get('Get connections', '/', async (ctx: AppContext, next: Next) => {
    // Get connections for a user
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Getting all of ${ctx.state.authenticatedUser.username}'s connections`
    );

    await next();
  })
  .post('Creating connection', '/', async (ctx: AppContext, next: Next) => {
    // Get `IConnection` from ctx.request.body

    // Construct id and sortname

    // save connection

    // get saved connection

    // return `IConnectionResponse`
    ctx.status = 201;
    ctx.body = JSON.stringify(
      `Creating connection for ${ctx.state.authenticatedUser.username}`
    );

    await next();
  })
  .del('Delete connection', '/:id', async (ctx: AppContext, next: Next) => {
    // Get connection to delete

    // if connection doesn't exist return a 404

    // if it does continue to delete

    ctx.status = 204;

    await next();
  });

export default connectionsRouter;
