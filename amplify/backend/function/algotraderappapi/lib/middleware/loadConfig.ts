import Config from '../config';
import { AppContext } from '../types';
import { Next } from 'koa';

const loadConfig = async (ctx: AppContext, next: Next) => {
  ctx.state.config = await Config.getConfig();

  await next();
};

export default loadConfig;
