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

const getLoggerOptions = ({ method, path }: AppContext) => {
  return { fileName: 'connection/td.ts', method, path };
};

const tdConnectionsRouter = new Router({ prefix: '/td' })
  .use(loadTdAmeritradeClient)
  .get(
    'Connect which might take over create connection',
    '/connect',
    async (ctx: AppContext, _next: Next) => {
      const {
        state: { logger },
        query: { code, redirectUrl, state },
      } = ctx;

      const loggerOptions = getLoggerOptions(ctx);

      logger.info('Connecting TD Connection', loggerOptions);

      if (!!!redirectUrl && !!!code) {
        const message = 'Query parameter `redirectUrl` required';
        logger.error(message, loggerOptions);
        ctx.throw(400, message);
      }

      if (code) {
        logger.info('Retrieving code', loggerOptions);

        const {
          authenticatedUser: { username },
        } = ctx.state;
        const decodedCode = decodeURI(code as string);

        logger.info('Authenticating with TD Ameritrade for user', {
          ...loggerOptions,
          username,
        });

        const { status, data } =
          await ctx.state.tdAmeritradeClient.auth.authenticate(
            decodedCode,
            state as string
          );

        const connectionToSave = await convertTokenToIConnection(data, 'td');

        logger.info('Saving connection', loggerOptions);

        await saveConnection(username, connectionToSave);

        logger.info('Connection saved', loggerOptions);

        ctx.status = status;
        ctx.body = convertIConnectionToIConnectionResponse(connectionToSave);
      } else {
        const tdAuthUrl = getAuthUrl({
          client_id: ctx.state.config.tdConsumerKey,
          redirect_uri: redirectUrl as string,
        });

        ctx.status = 200;
        ctx.body = JSON.stringify(tdAuthUrl);

        logger.info('Returning authentication url', loggerOptions);
      }
    }
  )
  .get(
    'Get connections for user',
    '/',
    loadTdConnections,
    async (ctx: AppContext, _next: Next) => {
      const {
        connections,
        logger,
        authenticatedUser: { username },
      } = ctx.state;

      const loggerOptions = getLoggerOptions(ctx);

      ctx.status = 200;
      ctx.body = connections.map(convertIConnectionToIConnectionResponse);

      logger.info('Returning TD connections for user', {
        ...loggerOptions,
        username,
      });
    }
  )
  .get(
    'Get connection for user',
    '/:connectionId',
    loadTdConnection,
    async (ctx: AppContext, _next: Next) => {
      const { connection } = ctx.state;

      ctx.status = 200;
      ctx.body = convertIConnectionToIConnectionResponse(connection);
    }
  )
  .del(
    'Delete connection for user',
    '/:connectionId',
    loadTdConnection,
    async (ctx: AppContext, _next: Next) => {
      const {
        authenticatedUser: { username },
        connection: { connectionId },
        logger,
      } = ctx.state;

      const loggerOptions = getLoggerOptions(ctx);

      logger.info('Deleting connection for user', {
        ...loggerOptions,
        username,
        connectionId,
      });

      await deleteConnection(username, connectionId);

      ctx.status = 204;

      logger.info('Connection deleted for user', {
        ...loggerOptions,
        username,
        connectionId,
      });
    }
  );

export default tdConnectionsRouter;
