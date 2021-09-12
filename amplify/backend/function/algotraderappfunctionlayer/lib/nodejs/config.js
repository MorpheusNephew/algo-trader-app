"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var _awsSdk = require("aws-sdk");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tdConsumerKey = 'TD_CONSUMER_KEY';
const ssmKeys = [tdConsumerKey];

const _getConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    const config = {
      tdConsumerKey: null,
      cognitoUserPoolId: process.env.AUTH_ALGOTRADERAPP7860B9F7_USERPOOLID,
      lambdaEnv: process.env.ENV,
      lambdaRegion: process.env.REGION,
      algoTraderTableDbArn: process.env.STORAGE_ALGOTRADERTABLE_ARN,
      algoTraderTableDbName: process.env.STORAGE_ALGOTRADERTABLE_NAME,
      algoTraderTableDbStreamArn: process.env.STORAGE_ALGOTRADERTABLE_STREAMARN
    };
    const {
      Parameters
    } = yield new _awsSdk.SSM().getParameters({
      Names: ssmKeys.map(secretName => process.env[secretName]),
      WithDecryption: true
    }).promise();

    const secretsReducer = (acc, curr) => {
      let name = curr.Name;

      if (name.endsWith(tdConsumerKey)) {
        name = 'tdConsumerKey';
      }

      acc[name] = curr.Value;
      return acc;
    };

    const ssmConfig = Parameters.reduce(secretsReducer, {});
    return _objectSpread(_objectSpread({}, config), ssmConfig);
  });

  return function _getConfig() {
    return _ref.apply(this, arguments);
  };
}();

let configInstance = null;

class Config {
  static getConfig() {
    return _asyncToGenerator(function* () {
      if (!configInstance) {
        configInstance = yield _getConfig();
      }

      return configInstance;
    })();
  }

}

exports.Config = Config;