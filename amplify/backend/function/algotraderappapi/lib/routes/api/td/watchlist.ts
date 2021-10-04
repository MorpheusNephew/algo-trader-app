import { AppContext } from '../../../types';
import Router from '@koa/router';
import { Next } from 'koa';

export const tdWatchList = new Router({ prefix: '/watchlist' })
  .get(
    'Get all watchlists for all linked user accounts',
    '/',
    async (ctx: AppContext, _next: Next) => {
      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.getMultipleAccountsWatchlists();

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .post(
    'Create watchlist',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId } = ctx.params;
      const watchlistToCreate = ctx.request.body;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.createWatchlist(
          accountId,
          watchlistToCreate
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .get(
    'Get watchlists for a single account',
    '/:accountId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.getAccountWatchlists(
          accountId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .delete(
    'Delete watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, watchlistId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.deleteWatchlist(
          accountId,
          watchlistId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .put(
    'Replace watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, watchlistId } = ctx.params;
      const watchlistToReplacewith = ctx.request.body;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.replaceWatchlist(
          accountId,
          watchlistId,
          watchlistToReplacewith
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .patch(
    'Update watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, watchlistId } = ctx.params;
      const updatedWatchlist = ctx.request.body;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.updateWatchlist(
          accountId,
          watchlistId,
          updatedWatchlist
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  )
  .get(
    'Get watchlist',
    '/:accountId/:watchlistId',
    async (ctx: AppContext, _next: Next) => {
      const { accountId, watchlistId } = ctx.params;

      const { data, status } =
        await ctx.state.tdAmeritradeClient.watchlist.getWatchlist(
          accountId,
          watchlistId
        );

      ctx.status = status;
      ctx.body = JSON.stringify(data);
    }
  );
