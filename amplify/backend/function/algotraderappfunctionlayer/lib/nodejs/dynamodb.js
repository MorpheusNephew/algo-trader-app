"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteItem = exports.getItem = exports.putItem = void 0;

var _config = require("./config");

var _awsSdk = require("aws-sdk");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const dynamoDb = new _awsSdk.DynamoDB();

const putItem = input => {
  return performOperation(tableName => dynamoDb.putItem(_objectSpread({
    TableName: tableName
  }, input)).promise());
};

exports.putItem = putItem;

const getItem = input => {
  return performOperation(tableName => dynamoDb.getItem(_objectSpread({
    TableName: tableName
  }, input)).promise());
};

exports.getItem = getItem;

const deleteItem = input => {
  return performOperation(tableName => dynamoDb.deleteItem(_objectSpread({
    TableName: tableName
  }, input)).promise());
};

exports.deleteItem = deleteItem;

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