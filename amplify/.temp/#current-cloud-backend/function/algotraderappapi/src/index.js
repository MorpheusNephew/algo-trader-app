"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;

var _loadConfig = require("./middleware/loadConfig");

var _routes = _interopRequireDefault(require("./routes"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koa = _interopRequireDefault(require("koa"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _serverlessHttp = _interopRequireDefault(require("serverless-http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default().use((0, _cors.default)()).use((0, _koaBodyparser.default)()).use(_loadConfig.loadConfig).use(_routes.default.routes());
const handler = (0, _serverlessHttp.default)(app);
exports.handler = handler;