"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = void 0;

var _logger = _interopRequireDefault(require("./logger"));

var _awsXraySdk = require("aws-xray-sdk");

var _clientSsm = require("@aws-sdk/client-ssm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const secretKeys = {
  TD_CONSUMER_KEY: 'tdConsumerKey'
};
const ssmKeys = Object.keys(secretKeys);
const client = (0, _awsXraySdk.captureAWSv3Client)(new _clientSsm.SSMClient({}));

const _getSecrets = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    const command = new _clientSsm.GetParametersCommand({
      Names: ssmKeys.map(secretName => process.env[secretName]),
      WithDecryption: true
    });
    const {
      Parameters
    } = yield client.send(command);

    const secretsReducer = (acc, curr) => {
      let name = curr.Name;

      for (const key in secretKeys) {
        if (name.endsWith(key)) {
          name = secretKeys[key];
          break;
        }
      }

      acc[name] = curr.Value;
      return acc;
    };

    return Parameters.reduce(secretsReducer, {});
  });

  return function _getSecrets() {
    return _ref.apply(this, arguments);
  };
}();

const getConfig = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (getSecrets = true) {
    _logger.default.info('Getting config', {
      getSecrets
    });

    const config = {
      tdConsumerKey: null,
      cognitoUserPoolId: process.env.AUTH_ALGOTRADERAPP7860B9F7_USERPOOLID,
      lambdaEnv: process.env.ENV,
      lambdaRegion: process.env.REGION,
      algoTraderTableDbArn: process.env.STORAGE_ALGOTRADERTABLE_ARN,
      algoTraderTableDbName: process.env.STORAGE_ALGOTRADERTABLE_NAME,
      algoTraderTableDbStreamArn: process.env.STORAGE_ALGOTRADERTABLE_STREAMARN
    };
    const ssmConfig = getSecrets ? yield _getSecrets() : {};
    return _objectSpread(_objectSpread({}, config), ssmConfig);
  });

  return function getConfig() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConfig = getConfig;