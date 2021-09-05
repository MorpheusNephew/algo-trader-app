import { AppContext } from '../types';
import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { Next } from 'koa';

export const loadTdAmeritradeClient = async (ctx: AppContext, next: Next) => {
  const { redirectUrl } = ctx.query;

  ctx.state.tdAmeritradeClient = new TdAmeritradeClient({
    clientId: ctx.state.config.tdConsumerKey,
    redirectUri: redirectUrl as string,
  });

  await next();
};
