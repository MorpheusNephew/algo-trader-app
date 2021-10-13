"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdWatchList = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdWatchList = new _router.default({
  prefix: '/watchlist'
}).get('Get all watchlists for all linked user accounts', '/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.getMultipleAccountsWatchlists();
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).post('Create watchlist', '/:accountId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const watchlistToCreate = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.createWatchlist(accountId, watchlistToCreate);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).get('Get watchlists for a single account', '/:accountId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.getAccountWatchlists(accountId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).delete('Delete watchlist', '/:accountId/:watchlistId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      watchlistId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.deleteWatchlist(accountId, watchlistId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).put('Replace watchlist', '/:accountId/:watchlistId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      watchlistId
    } = ctx.params;
    const watchlistToReplacewith = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.replaceWatchlist(accountId, watchlistId, watchlistToReplacewith);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()).patch('Update watchlist', '/:accountId/:watchlistId', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      watchlistId
    } = ctx.params;
    const updatedWatchlist = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.updateWatchlist(accountId, watchlistId, updatedWatchlist);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()).get('Get watchlist', '/:accountId/:watchlistId', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      watchlistId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.watchlist.getWatchlist(accountId, watchlistId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
exports.tdWatchList = tdWatchList;