import { AppContext } from '../types';
import { queryConnections } from '/opt/nodejs/connectiondb';
import { Next } from 'koa';

export const loadTdConnections = async (ctx: AppContext, next: Next) => {
  const {
    authenticatedUser: { username },
  } = ctx.state;

  const connections = await queryConnections(username, 'td');

  ctx.state.connections = connections ?? [];

  await next();
};
