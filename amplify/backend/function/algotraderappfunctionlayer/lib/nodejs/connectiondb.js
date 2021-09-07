"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteConnection = exports.getConnection = exports.saveConnection = void 0;

var _dynamodb = require("./dynamodb");

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
        type: {
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

const getConnection = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    const input = {
      Key: {}
    };
    return (0, _dynamodb.getItem)(input);
  });

  return function getConnection() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConnection = getConnection;

const deleteConnection = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    const input = {
      Key: {}
    };
    return (0, _dynamodb.deleteItem)(input);
  });

  return function deleteConnection() {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteConnection = deleteConnection;