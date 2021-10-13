"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdOrdersRouter = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdOrdersRouter = new _router.default({
  prefix: '/orders'
}).get('Get orders by query', '/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const options = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.orders.getOrdersByQuery(options);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('Get orders by path', '/:accountId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const options = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.orders.getOrdersByPath(accountId, options);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).post('Place order', '/:accountId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const orderToCreate = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.orders.placeOrder(accountId, orderToCreate);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).get('Get order', '/:accountId/:orderId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      orderId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.orders.getOrder(accountId, orderId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).put('Replace order', '/:accountId/:orderId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      orderId
    } = ctx.params;
    const replacementOrder = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.orders.replaceOrder(accountId, orderId, replacementOrder);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()).del('Cancel order', '/:accountId/:orderId', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      orderId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.orders.cancelOrder(accountId, orderId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
exports.tdOrdersRouter = tdOrdersRouter;