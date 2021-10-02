import { loadTdAmeritradeClient } from '../../../middleware/loadTdAmeritradeClient';
import { tdAccountsRouter } from './accounts';
import { tdInstrumentsRouter } from './instruments';
import { tdMarketHours } from './marketHours';
import { tdMoversRouter } from './movers';
import { tdOptionChainsRouter } from './optionChains';
import { tdOrdersRouter } from './orders';
import { tdPriceHistoryRouter } from './priceHistory';
import { tdQuotesRouter } from './quotes';
import { tdSavedOrdersRouter } from './savedOrders';
import { tdTransactionsRouter } from './transactions';
import { tdUserRouter } from './user';
import { tdWatchList } from './watchlist';
import Router from '@koa/router';

export const tdRouter = new Router({ prefix: '/td' })
  .use(loadTdAmeritradeClient)
  .use(tdAccountsRouter.routes())
  .use(tdOrdersRouter.routes())
  .use(tdSavedOrdersRouter.routes())
  .use(tdInstrumentsRouter.routes())
  .use(tdMarketHours.routes())
  .use(tdMoversRouter.routes())
  .use(tdOptionChainsRouter.routes())
  .use(tdPriceHistoryRouter.routes())
  .use(tdQuotesRouter.routes())
  .use(tdTransactionsRouter.routes())
  .use(tdUserRouter.routes())
  .use(tdWatchList.routes());
