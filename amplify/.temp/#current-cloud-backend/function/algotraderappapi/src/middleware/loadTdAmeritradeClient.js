"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTdAmeritradeClient = void 0;

var _clients = _interopRequireDefault(require("@morpheusnephew/td-ameritrade/dist/clients"));

var _connectionUtils = require("/opt/nodejs/connectionUtils");

var _dateFns = require("date-fns");

var _lodash = require("lodash");

var _connectiondb = require("/opt/nodejs/connectiondb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const loadTdAmeritradeClient = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const {
      redirectUrl
    } = ctx.query;
    const {
      authenticatedUser: {
        username
      }
    } = ctx.state;
    const tdAmeritradeClient = new _clients.default({
      clientId: ctx.state.config.tdConsumerKey,
      redirectUri: redirectUrl
    });
    const {
      accessToken
    } = yield getUserTdConnection(tdAmeritradeClient, username);

    if (accessToken) {
      tdAmeritradeClient.accessToken = accessToken;
    }

    ctx.state.tdAmeritradeClient = tdAmeritradeClient;
    yield next();
  });

  return function loadTdAmeritradeClient(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadTdAmeritradeClient = loadTdAmeritradeClient;

const getUserTdConnection = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (tdAmeritradeClient, username) {
    console.log('getUserTdConnection');
    const connections = yield (0, _connectiondb.getConnections)({
      username,
      connectionType: 'td'
    });
    console.log('getUserTdConnection', 'connections', connections);

    if ((0, _lodash.isEmpty)(connections)) {
      return null;
    }

    const connection = connections[0];
    console.log('getUserTdConnection', 'connection', connection);
    const {
      accessTokenExpiration,
      refreshToken,
      refreshTokenExpiration,
      connectionId
    } = connection;
    let {
      accessToken
    } = connection;
    const now = new Date();
    const accessExpiration = (0, _dateFns.parseISO)(accessTokenExpiration);
    console.log('getUserTdConnection', 'parseISO(accessTokenExpiration', accessExpiration);

    if ((0, _dateFns.differenceInSeconds)(accessExpiration, now) > 10) {
      return {
        accessToken
      };
    }

    tdAmeritradeClient.refreshToken = refreshToken;
    const {
      data: tokenResponse
    } = yield tdAmeritradeClient.auth.refreshAccessToken();
    console.log('getUserTdConnection', 'tokenResponse', tokenResponse);
    const connectionToUpdate = yield (0, _connectionUtils.convertTokenToIConnection)(tokenResponse, 'td', connectionId);
    yield (0, _connectiondb.updateConnectionTokens)(username, connectionId, _objectSpread(_objectSpread({}, connectionToUpdate), {}, {
      refreshToken,
      refreshTokenExpiration
    }));
    return connectionToUpdate;
  });

  return function getUserTdConnection(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();