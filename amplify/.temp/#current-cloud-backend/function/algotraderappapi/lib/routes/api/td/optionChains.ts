import { AppContext } from '../../../types';
import Router from '@koa/router';
import { OptionChainOptions } from '@morpheusnephew/td-ameritrade/dist/clients/option-chains-client';
import { Next } from 'koa';

export const tdOptionChainsRouter = new Router({
  prefix: '/option-chains',
}).get('Get option chain', '/', async (ctx: AppContext, _next: Next) => {
  const options = ctx.query as unknown as OptionChainOptions;

  const { data, status } =
    await ctx.state.tdAmeritradeClient.optionChains.getOptionChain(options);

  ctx.status = status;
  ctx.body = JSON.stringify(data);
});
