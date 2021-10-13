"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdPriceHistoryRouter = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdPriceHistoryRouter = new _router.default({
  prefix: '/price-history'
}).get('Get price history', '/:symbol', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const {
      symbol
    } = ctx.params;
    const options = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.priceHistory.getPriceHistory(symbol, options);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
exports.tdPriceHistoryRouter = tdPriceHistoryRouter;