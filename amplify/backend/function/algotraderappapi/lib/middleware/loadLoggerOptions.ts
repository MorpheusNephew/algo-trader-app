import { AppContext } from '../types';
import { Next } from 'koa';

export const loadLoggerOptions =
  (fileName: string) => async (ctx: AppContext, next: Next) => {
    const { method, path } = ctx;

    ctx.state.loggerOptions = { fileName, method, path };

    await next();
  };
