"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tdUserRouter = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdUserRouter = new _router.default({
  prefix: '/user'
}).get('/:accountId/preferences', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const {
      data: preferences,
      status
    } = yield ctx.state.tdAmeritradeClient.userInfo.getPreferences(accountId);
    ctx.status = status;
    ctx.body = JSON.stringify(preferences);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).put('/:accountId/preferences', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountId
    } = ctx.params;
    const updatedPreferences = ctx.request.body;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.userInfo.updatePreferences(accountId, updatedPreferences);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).get('/details', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (ctx, _next) {
    const {
      fields
    } = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.userInfo.getUserPrincipals(fields);
    ctx.status = status;
    ctx.body = JSON.stringify(data);
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).get('/subscription-keys', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (ctx, _next) {
    const {
      accountIds
    } = ctx.query;
    const {
      data,
      status
    } = yield ctx.state.tdAmeritradeClient.userInfo.getStreamerSubscriptionKeys(accountIds);
    ctx.status = status;
    ctx.body = data;
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
exports.tdUserRouter = tdUserRouter;