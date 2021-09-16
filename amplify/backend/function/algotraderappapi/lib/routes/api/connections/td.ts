import { loadTdAmeritradeClient } from '../../../middleware/loadTdAmeritradeClient';
import { loadTdConnection } from '../../../middleware/loadTdConnection';
import { loadTdConnections } from '../../../middleware/loadTdConnections';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { getAuthUrl } from '@morpheusnephew/td-ameritrade';
import { deleteConnection, saveConnection } from '/opt/nodejs/connectiondb';
import { Next } from 'koa';
import {
  convertIConnectionToIConnectionResponse,
  convertTokenToIConnection,
} from '/opt/nodejs/connectionUtils';

const tdConnectionsRouter = new Router({ prefix: '/td' })
  .use(loadTdAmeritradeClient)
  .get(
    'Connect which might take over create connection',
    '/connect',
    async (ctx: AppContext, next: Next) => {
      const { code, redirectUrl, state } = ctx.query;

      if (!!!redirectUrl && !!!code) {
        ctx.throw(400, 'Query parameter `redirectUrl` required');
      }

      if (code) {
        const {
          authenticatedUser: { username },
        } = ctx.state;
        const decodedCode = decodeURI(code as string);

        const { status, data } =
          await ctx.state.tdAmeritradeClient.auth.authenticate(
            decodedCode,
            state as string
          );

        const connectionToSave = await convertTokenToIConnection(data, 'td');

        await saveConnection(username, connectionToSave);

        ctx.status = status;
        ctx.body = JSON.stringify(
          convertIConnectionToIConnectionResponse(connectionToSave)
        );
      } else {
        const tdAuthUrl = getAuthUrl({
          client_id: ctx.state.config.tdConsumerKey,
          redirect_uri: redirectUrl as string,
        });

        ctx.status = 200;
        ctx.body = JSON.stringify(tdAuthUrl);
      }

      await next();
    }
  )
  .get(
    'Get connections for user',
    '/',
    loadTdConnections,
    async (ctx: AppContext, next: Next) => {
      const { connections } = ctx.state;

      ctx.status = 200;
      ctx.body = JSON.stringify(connections);

      await next();
    }
  )
  .get(
    'Get connection for user',
    '/:connectionId',
    loadTdConnection,
    async (ctx: AppContext, next: Next) => {
      const { connection } = ctx.state;

      ctx.status = 200;
      ctx.body = JSON.stringify(connection);

      await next();
    }
  )
  .del(
    'Delete connection for user',
    '/:connectionId',
    loadTdConnection,
    async (ctx: AppContext, next: Next) => {
      const {
        authenticatedUser: { username },
        connection: { connectionId },
      } = ctx.state;

      await deleteConnection(username, connectionId);

      ctx.status = 204;

      await next();
    }
  );

export default tdConnectionsRouter;
