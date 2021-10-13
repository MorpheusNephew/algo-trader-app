"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _td = _interopRequireDefault(require("./td"));

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectionsRouter = new _router.default({
  prefix: '/connections'
}).use(_td.default.routes());
var _default = connectionsRouter;
exports.default = _default;