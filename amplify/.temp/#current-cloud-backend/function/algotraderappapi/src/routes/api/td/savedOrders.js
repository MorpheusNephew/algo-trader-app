"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdSavedOrdersRouter = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdSavedOrdersRouter = new _router.default({
  prefix: '/saved-orders'
}).post('Create saved order', '/:accountId', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const savedOrder = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.savedOrders.createSavedOrder(accountId, savedOrder);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('Get saved orders by path', '/:accountId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.savedOrders.getSavedOrdersByPath(accountId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).get('Get saved order', '/:accountId/:savedOrderId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      savedOrderId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.savedOrders.getSavedOrder(accountId, savedOrderId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).put('Replace saved order', '/:accountId/:savedOrderId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      savedOrderId
    } = ctx.params;
    const replacementOrder = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.savedOrders.replaceSavedOrder(accountId, savedOrderId, replacementOrder);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).del('Delete saved order', '/:accountId/:savedOrderId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId,
      savedOrderId
    } = ctx.params;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.savedOrders.deleteSavedOrder(accountId, savedOrderId);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
exports.tdSavedOrdersRouter = tdSavedOrdersRouter;