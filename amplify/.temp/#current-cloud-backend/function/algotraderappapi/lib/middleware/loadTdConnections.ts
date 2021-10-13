import { AppContext } from '../types';
import { getConnections } from '/opt/nodejs/connectiondb';
import { Next } from 'koa';

export const loadTdConnections = async (ctx: AppContext, next: Next) => {
  const {
    authenticatedUser: { username },
  } = ctx.state;

  const connections = await getConnections({
    username,
    connectionType: 'td',
  });

  ctx.state.connections = connections ?? [];

  await next();
};
