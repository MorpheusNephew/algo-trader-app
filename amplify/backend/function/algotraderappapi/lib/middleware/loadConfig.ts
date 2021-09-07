import { AppContext } from '../types';
import { Config } from '/opt/nodejs/config';
import { Next } from 'koa';

const loadConfig = async (ctx: AppContext, next: Next) => {
  ctx.state.config = await Config.getConfig();

  await next();
};

export default loadConfig;
