import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { OptionChainOptions } from '@morpheusnephew/td-ameritrade/dist/clients/option-chains-client';
import { Next } from 'koa';

export const tdOptionChainsRouter = new Router({
  prefix: '/option-chains',
})
  .use(loadLoggerOptions('td/optionChains.ts'))
  .get('Get option chain', '/', async (ctx: AppContext, _next: Next) => {
    const optionsChainOptions = ctx.query as unknown as OptionChainOptions;
    const { logger, loggerOptions } = ctx.state;

    const updatedLoggerOptions = { ...loggerOptions, optionsChainOptions };

    logger.info('Getting option chain', updatedLoggerOptions);

    const { data, status } =
      await ctx.state.tdAmeritradeClient.optionChains.getOptionChain(
        optionsChainOptions
      );

    ctx.status = status;
    ctx.body = JSON.stringify(data);

    logger.info('Option chain retrieved', updatedLoggerOptions);
  });
