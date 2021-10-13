"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadTdAmeritradeClient = require("../../../middleware/loadTdAmeritradeClient");

var _loadTdConnection = require("../../../middleware/loadTdConnection");

var _loadTdConnections = require("../../../middleware/loadTdConnections");

var _router = _interopRequireDefault(require("@koa/router"));

var _tdAmeritrade = require("@morpheusnephew/td-ameritrade");

var _connectiondb = require("/opt/nodejs/connectiondb");

var _connectionUtils = require("/opt/nodejs/connectionUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdConnectionsRouter = new _router.default({
  prefix: '/td'
}).use(_loadTdAmeritradeClient.loadTdAmeritradeClient).get('Connect which might take over create connection', '/connect', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, _next) {
    const {
      code,
      redirectUrl,
      state
    } = ctx.query;

    if (!!!redirectUrl && !!!code) {
      ctx.throw(400, 'Query parameter `redirectUrl` required');
    }

    if (code) {
      const {
        authenticatedUser: {
          username
        }
      } = ctx.state;
      const decodedCode = decodeURI(code);
      const {
        status,
        data
      } = yield ctx.state.tdAmeritradeClient.auth.authenticate(decodedCode, state);
      const connectionToSave = yield (0, _connectionUtils.convertTokenToIConnection)(data, 'td');
      yield (0, _connectiondb.saveConnection)(username, connectionToSave);
      ctx.status = status;
      ctx.body = JSON.stringify((0, _connectionUtils.convertIConnectionToIConnectionResponse)(connectionToSave));
    } else {
      const tdAuthUrl = (0, _tdAmeritrade.getAuthUrl)({
        client_id: ctx.state.config.tdConsumerKey,
        redirect_uri: redirectUrl
      });
      ctx.status = 200;
      ctx.body = JSON.stringify(tdAuthUrl);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('Get connections for user', '/', _loadTdConnections.loadTdConnections, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (ctx, _next) {
    const {
      connections
    } = ctx.state;
    ctx.status = 200;
    ctx.body = JSON.stringify(connections.map(_connectionUtils.convertIConnectionToIConnectionResponse));
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).get('Get connection for user', '/:connectionId', _loadTdConnection.loadTdConnection, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (ctx, _next) {
    const {
      connection
    } = ctx.state;
    ctx.status = 200;
    ctx.body = JSON.stringify((0, _connectionUtils.convertIConnectionToIConnectionResponse)(connection));
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).del('Delete connection for user', '/:connectionId', _loadTdConnection.loadTdConnection, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (ctx, _next) {
    const {
      authenticatedUser: {
        username
      },
      connection: {
        connectionId
      }
    } = ctx.state;
    yield (0, _connectiondb.deleteConnection)(username, connectionId);
    ctx.status = 204;
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = tdConnectionsRouter;
exports.default = _default;