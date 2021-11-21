import { AppContext } from '../types';
import { getConnections } from '/opt/nodejs/connectiondb';
import { Next } from 'koa';

const loggerOptions = {
  fileName: 'loadTdConnections.ts',
};

export const loadTdConnections = async (ctx: AppContext, next: Next) => {
  const {
    authenticatedUser: { username },
    logger,
  } = ctx.state;

  logger.info('Loading TD connections', loggerOptions);

  const connections = await getConnections({
    username,
    brokerage: 'td',
  });

  if (connections) {
    ctx.state.connections = connections;
    logger.info('Connections loaded', loggerOptions);
  } else {
    ctx.state.connections = [];
    logger.info(
      'Connections not found returning; Loading empty array',
      loggerOptions
    );
  }

  await next();
};
