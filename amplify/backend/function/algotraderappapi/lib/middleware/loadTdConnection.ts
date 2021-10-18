import { AppContext } from '../types';
import { getConnection } from '/opt/nodejs/connectiondb';
import { Next } from 'koa';

const loggerOptions = {
  fileName: 'loadTdConnection.ts',
};

export const loadTdConnection = async (ctx: AppContext, next: Next) => {
  const {
    authenticatedUser: { username },
    logger,
  } = ctx.state;

  logger.info('Loading connection', loggerOptions);

  const { connectionId } = ctx.params;

  logger.info('Getting connection from connectionId', {
    ...loggerOptions,
    connectionId,
  });

  const connection = await getConnection(username, connectionId);

  if (!connection) {
    const message = 'Connection not found';
    logger.error(message, {
      ...loggerOptions,
      connectionId,
    });
    ctx.throw(404, message);
  }

  ctx.state.connection = connection;
  logger.info('Connection loaded', loggerOptions);

  await next();
};
