import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdUserRouter = new Router({ prefix: '/user' })
  .use(loadLoggerOptions('td/user.ts'))
  .get('Get user details', '/details', async (ctx: AppContext, _next: Next) => {
    const {
      query: { fields },
      state: { logger, loggerOptions },
    } = ctx;

    const updatedLoggerOptions = { ...loggerOptions, fields };

    logger.info('Getting user details', updatedLoggerOptions);

    const { data, status } =
      await ctx.state.tdAmeritradeClient.userInfo.getUserPrincipals(
        fields as any
      );

    ctx.status = status;
    ctx.body = data;

    logger.info('User details retreived', updatedLoggerOptions);
  })
  .get(
    'Get subscription keys for accounts',
    '/subscription-keys',
    async (ctx: AppContext, _next: Next) => {
      const {
        query: { accountIds },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountIds };

      logger.info('Getting subscription keys', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.userInfo.getStreamerSubscriptionKeys(
          accountIds as any
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Subscription keys retrieved', updatedLoggerOptions);
    }
  )
  .get(
    'Get user preferences',
    '/:accountId/preferences',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId };

      logger.info('Getting user preferences', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.userInfo.getPreferences(accountId);

      ctx.status = status;
      ctx.body = data;

      logger.info('User preferences retrieved', updatedLoggerOptions);
    }
  )
  .put(
    'Update user preferences',
    '/:accountId/preferences',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        request: { body: updatedPreferences },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        updatedPreferences,
      };

      logger.info('Updating user preferences', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.userInfo.updatePreferences(
          accountId,
          updatedPreferences as any
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('User preferences updated', updatedLoggerOptions);
    }
  );
