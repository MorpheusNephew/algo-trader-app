import { AppContext } from '../types';
import { getConnection } from '/opt/nodejs/connectiondb';
import { Next } from 'koa';

export const loadTdConnection = async (ctx: AppContext, next: Next) => {
  const {
    authenticatedUser: { username },
  } = ctx.state;

  const { connectionId } = ctx.params;

  const connection = await getConnection(username, connectionId);

  if (!connection) {
    ctx.throw(404, 'Connection not found');
  }

  ctx.state.connection = connection;

  await next();
};
