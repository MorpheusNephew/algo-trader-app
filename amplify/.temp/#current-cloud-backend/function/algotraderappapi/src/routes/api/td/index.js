"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdRouter = void 0;

var _loadTdAmeritradeClient = require("../../../middleware/loadTdAmeritradeClient");

var _accounts = require("./accounts");

var _instruments = require("./instruments");

var _marketHours = require("./marketHours");

var _movers = require("./movers");

var _optionChains = require("./optionChains");

var _orders = require("./orders");

var _priceHistory = require("./priceHistory");

var _quotes = require("./quotes");

var _savedOrders = require("./savedOrders");

var _transactions = require("./transactions");

var _user = require("./user");

var _watchlist = require("./watchlist");

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tdRouter = new _router.default({
  prefix: '/td'
}).use(_loadTdAmeritradeClient.loadTdAmeritradeClient).use(_accounts.tdAccountsRouter.routes()).use(_orders.tdOrdersRouter.routes()).use(_savedOrders.tdSavedOrdersRouter.routes()).use(_instruments.tdInstrumentsRouter.routes()).use(_marketHours.tdMarketHours.routes()).use(_movers.tdMoversRouter.routes()).use(_optionChains.tdOptionChainsRouter.routes()).use(_priceHistory.tdPriceHistoryRouter.routes()).use(_quotes.tdQuotesRouter.routes()).use(_transactions.tdTransactionsRouter.routes()).use(_user.tdUserRouter.routes()).use(_watchlist.tdWatchList.routes());
exports.tdRouter = tdRouter;