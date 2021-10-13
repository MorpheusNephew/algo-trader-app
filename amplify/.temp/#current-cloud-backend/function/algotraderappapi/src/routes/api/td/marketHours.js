"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdMarketHours = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdMarketHours = new _router.default({
  prefix: '/market-hours'
}).get('Get hours for multiple markets', '/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const {
      markets,
      date
    } = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.marketHours.getMultipleMarketHours(markets, date);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('Get hours for market', '/:market', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ctx, _next) {
    const {
      market
    } = ctx.params;
    const {
      date
    } = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.marketHours.getMarketHours(market, date);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
exports.tdMarketHours = tdMarketHours;