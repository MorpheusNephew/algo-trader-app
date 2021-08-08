import { AppContext } from '../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const router = new Router({ prefix: "/api" }).get(
  "greeting",
  "/",
  async (ctx: AppContext, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify(
      `Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}`
    );

    await next();
  }
);
