import { AppContext } from '../../../types';
import Router from '@koa/router';
import { getAuthUrl } from '@morpheusnephew/td-ameritrade';
import { Next } from 'koa';

const tdConnectionsRouter = new Router({ prefix: '/connections' })
  .get(
    'Connect which might take over create connection',
    '/connect',
    async (ctx: AppContext, next: Next) => {
      const { code, redirectUrl, state } = ctx.query;

      if (!!!redirectUrl && !!!code) {
        ctx.throw(400, 'Query parameter `redirectUrl` required');
      }

      if (code) {
        console.log('Code received', code);

        const decodedCode = decodeURI(code as string);

        console.log('Decoded code', decodedCode);

        try {
          const { status, data } =
            await ctx.state.tdAmeritradeClient.auth.authenticate(
              decodedCode,
              state as string
            );

          console.log(
            `Data has been retrieved`,
            'data.expires_in',
            data.expires_in,
            'data.refresh_token_expires_in',
            data.refresh_token_expires_in
          );

          // Convert time etc... to appropriate time format and call it a day

          ctx.status = status;
        } catch (e) {
          console.error(e);
          ctx.throw(e);
        }
      } else {
        const tdAuthUrl = getAuthUrl({
          client_id: ctx.state.config.tdConsumerKey,
          redirect_uri: redirectUrl as string,
        });

        console.log('tdAuthUrl', tdAuthUrl, 'what other magic');

        ctx.status = 200;
        ctx.body = JSON.stringify(tdAuthUrl);
      }

      await next();
    }
  )
  .get('Get connection for user', '/', async (ctx: AppContext, next: Next) => {
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
  .del(
    'Delete connection for user',
    '/',
    async (ctx: AppContext, next: Next) => {
      // Get connection to delete

      // if connection doesn't exist return a 404

      // if it does continue to delete

      ctx.status = 204;

      await next();
    }
  );

export default tdConnectionsRouter;
