"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = exports.deleteItem = exports.query = exports.getItem = exports.putItem = void 0;

var _config = require("./config");

var _clientDynamodb = require("@aws-sdk/client-dynamodb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const client = new _clientDynamodb.DynamoDBClient({});

const putItem = input => {
  return runCommand(tableName => new _clientDynamodb.PutItemCommand(_objectSpread({
    TableName: tableName
  }, input)));
};

exports.putItem = putItem;

const getItem = input => {
  return runCommand(tableName => new _clientDynamodb.GetItemCommand(_objectSpread({
    TableName: tableName
  }, input)));
};

exports.getItem = getItem;

const query = input => {
  return runCommand(tableName => new _clientDynamodb.QueryCommand(_objectSpread({
    TableName: tableName
  }, input)));
};

exports.query = query;

const deleteItem = input => {
  return runCommand(tableName => new _clientDynamodb.DeleteItemCommand(_objectSpread({
    TableName: tableName
  }, input)));
};

exports.deleteItem = deleteItem;

const scan = input => {
  return runCommand(tableName => new _clientDynamodb.ScanCommand(_objectSpread({
    TableName: tableName
  }, input)));
};

exports.scan = scan;

const performOperation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (operation) {
    const {
      algoTraderTableDbName
    } = yield _config.Config.getConfig();
    return operation(algoTraderTableDbName);
  });

  return function performOperation(_x) {
    return _ref.apply(this, arguments);
  };
}();

const runCommand = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (generateCommand) {
    return performOperation(tableName => {
      const command = generateCommand(tableName);
      return client.send(command);
    });
  });

  return function runCommand(_x2) {
    return _ref2.apply(this, arguments);
  };
}();