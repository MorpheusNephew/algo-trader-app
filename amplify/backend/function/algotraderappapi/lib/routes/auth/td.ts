import { AppContext } from '../../types';
import Router from '@koa/router';
import { getAuthUrl as getTdAuthUrl } from '@morpheusnephew/td-ameritrade';
import { Next } from 'koa';

const tdAuthRouter = new Router({ prefix: '/td' }).get(
  'Get TD redirect url',
  '/',
  async (ctx: AppContext, next: Next) => {
    const { code, redirectUrl } = ctx.query;

    if (!!!redirectUrl && !!!code) {
      ctx.throw(400, 'Query parameter `redirectUrl` required');
    }

    if (code) {
      const decodedCode = decodeURI(code as string);

      const { status, data } =
        await ctx.state.tdAmeritradeClient.auth.authenticate(decodedCode);

      console.log(
        `Data has been retrieved`,
        'data.expires_in',
        data.expires_in,
        'data.refresh_token_expires_in',
        data.refresh_token_expires_in
      );

      ctx.status = status;
    } else {
      const tdAuthUrl = getTdAuthUrl({
        client_id: ctx.state.config.tdConsumerKey,
        redirect_uri: redirectUrl as string,
      });

      console.log('tdAuthUrl', tdAuthUrl, 'what other magic');

      ctx.redirect(tdAuthUrl);
    }

    await next();
  }
);

export default tdAuthRouter;
