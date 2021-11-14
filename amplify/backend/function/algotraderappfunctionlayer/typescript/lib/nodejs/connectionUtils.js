"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertIConnectionToIConnectionResponse = exports.convertTokenToIConnection = void 0;

var _utils = require("./utils");

var _uuid = require("uuid");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const convertTokenToIConnection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (token, type, connectionId) {
    const {
      access_token: accessToken,
      expires_in,
      refresh_token: refreshToken,
      refresh_token_expires_in
    } = token;
    return {
      accessToken,
      refreshToken,
      connectionId: connectionId ?? (0, _uuid.v4)(),
      accessTokenExpiration: (0, _utils.getDateSecondsFromNow)(expires_in),
      refreshTokenExpiration: refresh_token_expires_in && (0, _utils.getDateSecondsFromNow)(refresh_token_expires_in),
      type
    };
  });

  return function convertTokenToIConnection(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.convertTokenToIConnection = convertTokenToIConnection;

const convertIConnectionToIConnectionResponse = connection => {
  const {
    connectionId,
    type
  } = connection;
  return {
    id: connectionId,
    type
  };
};

exports.convertIConnectionToIConnectionResponse = convertIConnectionToIConnectionResponse;