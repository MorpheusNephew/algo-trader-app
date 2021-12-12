"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserPreferences = exports.getUserPreferences = void 0;

var _dynamodb = require("./dynamodb");

var _utilDynamodb = require("@aws-sdk/util-dynamodb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getUserPreferences = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (username, brokerage) {
    const input = {
      Key: (0, _utilDynamodb.marshall)({
        id: username,
        sortName: brokerage
      }),
      AttributesToGet: ['preferences']
    };
    const preferences = yield (0, _dynamodb.getItem)(input);
    return preferences;
  });

  return function getUserPreferences(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUserPreferences = getUserPreferences;

const saveUserPreferences = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (username, preferences) {
    const input = {
      Item: (0, _utilDynamodb.marshall)({})
    };
    const result = yield (0, _dynamodb.putItem)(input);
    return result;
  });

  return function saveUserPreferences(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.saveUserPreferences = saveUserPreferences;