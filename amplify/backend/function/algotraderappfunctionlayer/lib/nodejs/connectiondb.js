"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateConnectionTokens = exports.deleteConnection = exports.getConnection = exports.getConnections = exports.saveConnection = void 0;

var _logger = _interopRequireDefault(require("./logger"));

var _utils = require("./utils");

var _utilDynamodb = require("@aws-sdk/util-dynamodb");

var _lodash = require("lodash");

var _dynamodb = require("./dynamodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const logger = _logger.default.getLogger();

const saveConnection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (username, connectionToSave) {
    logger.info('Save connection for user', {
      username
    });
    const {
      accessToken,
      accessTokenExpiration,
      connectionId,
      refreshToken,
      refreshTokenExpiration,
      type
    } = connectionToSave;
    const input = {
      Item: (0, _utilDynamodb.marshall)({
        id: username,
        sortName: type,
        accessToken: yield (0, _utils.encryptItem)(accessToken),
        accessTokenExpiration,
        connectionId,
        refreshToken: yield (0, _utils.encryptItem)(refreshToken),
        refreshTokenExpiration,
        rowType: `connection:${type}:${username}`
      })
    };
    return (0, _dynamodb.putItem)(input);
  });

  return function saveConnection(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveConnection = saveConnection;

const getConnections = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (params) {
    const username = params === null || params === void 0 ? void 0 : params.username;
    return username ? queryConnections(params) : scanConnections(params);
  });

  return function getConnections(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConnections = getConnections;

const queryConnections = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (params) {
    logger.info('Query connections', {
      params
    });
    const username = params.username;
    const connectionType = params === null || params === void 0 ? void 0 : params.connectionType;
    let connectionAttributeValue = {
      ':connectionType': 'connection'
    };
    const filterExpression = 'begins_with (rowType, :connectionType)';

    if (connectionType) {
      connectionAttributeValue = {
        ':connectionType': `connection:${connectionType}`
      };
    }

    const input = {
      ExpressionAttributeValues: (0, _utilDynamodb.marshall)(_objectSpread({
        ':id': username
      }, connectionAttributeValue)),
      KeyConditionExpression: 'id = :id',
      FilterExpression: filterExpression
    };
    const {
      Items
    } = yield (0, _dynamodb.query)(input);
    return Promise.all(Items === null || Items === void 0 ? void 0 : Items.map(Item => convertDbConnectionToIConnection(Item))) ?? [];
  });

  return function queryConnections(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

const scanConnections = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (params) {
    logger.info('Scan connections', {
      params
    });
    const connectionType = params === null || params === void 0 ? void 0 : params.connectionType;
    let input = null;

    if (connectionType) {
      input = {
        ExpressionAttributeValues: (0, _utilDynamodb.marshall)({
          ':sortName': connectionType
        }),
        FilterExpression: 'sortName = :sortName'
      };
    }

    const {
      Items
    } = yield (0, _dynamodb.scan)(input);
    return Promise.all(Items === null || Items === void 0 ? void 0 : Items.map(Item => convertDbConnectionToIConnection(Item))) ?? [];
  });

  return function scanConnections(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

const getConnection = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (username, connectionId) {
    logger.info('Get connection', {
      username,
      connectionId
    });
    const input = {
      ExpressionAttributeValues: (0, _utilDynamodb.marshall)({
        ':connectionId': connectionId,
        ':id': username
      }),
      KeyConditionExpression: 'id = :id',
      FilterExpression: 'connectionId = :connectionId'
    };
    const {
      Items
    } = yield (0, _dynamodb.query)(input);

    if ((0, _lodash.isEmpty)(Items)) {
      return null;
    }

    return convertDbConnectionToIConnection(Items[0]);
  });

  return function getConnection(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getConnection = getConnection;

const deleteConnection = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (username, connectionId) {
    logger.info('Delete connection', {
      username,
      connectionId
    });
    const input = {
      Key: (0, _utilDynamodb.marshall)({
        id: username
      }),
      ExpressionAttributeValues: (0, _utilDynamodb.marshall)({
        ':connectionId': connectionId
      }),
      ConditionExpression: 'connectionId = :connectionId'
    };
    return (0, _dynamodb.deleteItem)(input);
  });

  return function deleteConnection(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteConnection = deleteConnection;

const updateConnectionTokens = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (username, connectionId, tokensInformation) {
    logger.info('Update connection token', {
      username,
      connectionId
    });
    const {
      accessToken,
      accessTokenExpiration,
      refreshToken,
      refreshTokenExpiration,
      type
    } = tokensInformation;
    const input = {
      Key: (0, _utilDynamodb.marshall)({
        id: username,
        sortName: type
      }),
      ConditionExpression: 'connectionId = :connectionId',
      ExpressionAttributeValues: (0, _utilDynamodb.marshall)({
        ':connectionId': connectionId,
        ':accessToken': yield (0, _utils.encryptItem)(accessToken),
        ':accessTokenExpiration': accessTokenExpiration,
        ':refreshToken': yield (0, _utils.encryptItem)(refreshToken),
        ':refreshTokenExpiration': refreshTokenExpiration
      }),
      UpdateExpression: 'SET accessToken = :accessToken, accessTokenExpiration = :accessTokenExpiration, refreshToken = :refreshToken, refreshTokenExpiration = :refreshTokenExpiration'
    };
    return (0, _dynamodb.updateItem)(input);
  });

  return function updateConnectionTokens(_x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.updateConnectionTokens = updateConnectionTokens;

const convertDbConnectionToIConnection = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (dbConnection) {
    var _result$rowType;

    const result = (0, _utilDynamodb.unmarshall)(dbConnection);
    return _objectSpread(_objectSpread({}, result), {}, {
      username: result.id,
      accessToken: yield (0, _utils.decryptItem)(result.accessToken),
      refreshToken: yield (0, _utils.decryptItem)(result.refreshToken),
      type: result === null || result === void 0 ? void 0 : (_result$rowType = result.rowType) === null || _result$rowType === void 0 ? void 0 : _result$rowType.split(':')[1]
    });
  });

  return function convertDbConnectionToIConnection(_x13) {
    return _ref8.apply(this, arguments);
  };
}();