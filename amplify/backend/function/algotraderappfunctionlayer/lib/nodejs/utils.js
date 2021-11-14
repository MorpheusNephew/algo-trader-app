"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptItem = exports.encryptItem = exports.getDateSecondsFromNow = void 0;

var _config = require("./config");

var _cryptr = _interopRequireDefault(require("cryptr"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getDateSecondsFromNow = seconds => {
  const futureDate = (0, _dateFns.addSeconds)(new Date(), seconds);
  return (0, _dateFns.formatISO)(futureDate);
};

exports.getDateSecondsFromNow = getDateSecondsFromNow;

const getCryptr = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    const {
      cognitoUserPoolId
    } = yield (0, _config.getConfig)();
    return new _cryptr.default(cognitoUserPoolId);
  });

  return function getCryptr() {
    return _ref.apply(this, arguments);
  };
}();

const encryptItem = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (itemToEncrypt) {
    const {
      encrypt
    } = yield getCryptr();
    return encrypt(itemToEncrypt);
  });

  return function encryptItem(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.encryptItem = encryptItem;

const decryptItem = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (itemToDecrypt) {
    const {
      decrypt
    } = yield getCryptr();
    return decrypt(itemToDecrypt);
  });

  return function decryptItem(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.decryptItem = decryptItem;