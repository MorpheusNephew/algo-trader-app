import { loadLoggerOptions } from '../../../middleware/loadLoggerOptions';
import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdWatchList = new Router({ prefix: '/watchlist' })
  .use(loadLoggerOptions('td/watchlist.ts'))
  .get(
    'Get all watchlists for all linked user accounts',
    '/',
    async (ctx: AppContext, _next: Next) => {
      const { logger, loggerOptions } = ctx.state;

      logger.info('Getting all user linked watchlists', loggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.getMultipleAccountsWatchlists();

      ctx.status = status;
      ctx.body = data;

      logger.info('All user linked watchlists retrieved', loggerOptions);
    }
  )
  .post(
    'Create watchlist',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        request: { body: watchlistToCreate },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        watchlistToCreate,
      };

      logger.info('Creating watchlist', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.createWatchlist(
          accountId,
          watchlistToCreate
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Watchlist created', updatedLoggerOptions);
    }
  )
  .get(
    'Get watchlists for a single account',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId };

      logger.info('Getting watchlists for account', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.getAccountWatchlists(
          accountId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Watchlists for account retrieved', updatedLoggerOptions);
    }
  )
  .delete(
    'Delete watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, watchlistId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId, watchlistId };

      logger.info('Deleting watchlist', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.deleteWatchlist(
          accountId,
          watchlistId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Watchlist deleted', updatedLoggerOptions);
    }
  )
  .put(
    'Replace watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, watchlistId },
        request: { body: newWatchlist },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        watchlistId,
        newWatchlist,
      };

      logger.info('Replacing watchlist', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.replaceWatchlist(
          accountId,
          watchlistId,
          newWatchlist
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Watchlist replaced', updatedLoggerOptions);
    }
  )
  .patch(
    'Update watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, watchlistId },
        request: { body: updatedWatchlist },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = {
        ...loggerOptions,
        accountId,
        watchlistId,
        updatedWatchlist,
      };

      logger.info('Updating watchlist', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.updateWatchlist(
          accountId,
          watchlistId,
          updatedWatchlist
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Watchlist updated', updatedLoggerOptions);
    }
  )
  .get(
    'Get watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const {
        params: { accountId, watchlistId },
        state: { logger, loggerOptions },
      } = ctx;

      const updatedLoggerOptions = { ...loggerOptions, accountId, watchlistId };

      logger.info('Getting watchlist', updatedLoggerOptions);

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.getWatchlist(
          accountId,
          watchlistId
        );

      ctx.status = status;
      ctx.body = data;

      logger.info('Watchlist retrieved', updatedLoggerOptions);
    }
  );
