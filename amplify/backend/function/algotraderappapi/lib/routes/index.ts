import Router from '@koa/router';
import { Context, Next } from 'koa';

export const router = new Router({ prefix: "/api" }).get(
  "greeting",
  "/",
  async (ctx: Context, next: Next) => {
    ctx.status = 200;
    ctx.body = JSON.stringify("Welcome to a Koa routed API");

    await next();
  }
);
