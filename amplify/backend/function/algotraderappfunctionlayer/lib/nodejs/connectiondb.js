"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteConnection = exports.getConnection = exports.getConnections = exports.saveConnection = void 0;

var _dynamodb = require("./dynamodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const saveConnection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (username, connectionToSave) {
    const {
      accessToken,
      accessTokenExpiration,
      connectionId,
      refreshToken,
      refreshTokenExpiration,
      type
    } = connectionToSave;
    const input = {
      Item: {
        id: {
          S: username
        },
        sortName: {
          S: type
        },
        accessToken: {
          S: accessToken
        },
        accessTokenExpiration: {
          S: accessTokenExpiration
        },
        connectionId: {
          S: connectionId
        },
        refreshToken: {
          S: refreshToken
        },
        refreshTokenExpiration: {
          S: refreshTokenExpiration
        },
        rowType: {
          S: `connection:${type}:${username}`
        }
      }
    };
    return (0, _dynamodb.putItem)(input);
  });

  return function saveConnection(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveConnection = saveConnection;

const getConnections = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (username, connectionType) {
    let connectionAttributeValue = null;
    let filterExpression = null;

    if (connectionType) {
      connectionAttributeValue = {
        ':connectionType': {
          S: `connection:${connectionType}`
        }
      };
      filterExpression = 'begins_with (rowType, :connectionType)';
    }

    const input = {
      ExpressionAttributeValues: _objectSpread({
        ':id': {
          S: username
        }
      }, connectionAttributeValue),
      KeyConditionExpression: 'id = :id',
      FilterExpression: filterExpression
    };
    const results = yield (0, _dynamodb.query)(input);
    return results.Items;
  });

  return function getConnections(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConnections = getConnections;

const getConnection = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    const input = {
      Key: {}
    };
    return (0, _dynamodb.getItem)(input);
  });

  return function getConnection() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getConnection = getConnection;

const deleteConnection = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    const input = {
      Key: {}
    };
    return (0, _dynamodb.deleteItem)(input);
  });

  return function deleteConnection() {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteConnection = deleteConnection;