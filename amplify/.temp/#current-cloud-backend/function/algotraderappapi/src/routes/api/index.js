"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkUser = _interopRequireDefault(require("../../middleware/checkUser"));

var _configurationRouter = _interopRequireDefault(require("./configurationRouter"));

var _connections = _interopRequireDefault(require("./connections"));

var _td = require("./td");

var _router = _interopRequireDefault(require("@koa/router"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const apiRouter = new _router.default({
  prefix: '/api'
}).use((0, _koaBodyparser.default)()).use(_checkUser.default).get('greeting', '/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    ctx.status = 200;
    ctx.body = JSON.stringify(`Welcome to a Koa routed API ${ctx.state.authenticatedUser.username}!`);
    yield next();
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).use(_configurationRouter.default.routes()).use(_connections.default.routes()).use(_td.tdRouter.routes());
var _default = apiRouter;
exports.default = _default;