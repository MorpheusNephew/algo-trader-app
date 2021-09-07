"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertIConnectionToIConnectionResponse = exports.convertTokenToIConnection = void 0;

var _utils = require("./utils");

var _uuid = require("uuid");

const convertTokenToIConnection = (token, type) => {
  const {
    access_token,
    expires_in,
    refresh_token,
    refresh_token_expires_in
  } = token;
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    connectionId: (0, _uuid.v4)(),
    accessTokenExpiration: (0, _utils.getDateSecondsFromNow)(expires_in),
    refreshTokenExpiration: (0, _utils.getDateSecondsFromNow)(refresh_token_expires_in),
    type
  };
};

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