"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCognitoUser = void 0;

var _utils = require("../utils");

var _clientCognitoIdentityProvider = require("@aws-sdk/client-cognito-identity-provider");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getCognitoUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx) {
    var _ctx$req$requestConte, _ctx$req$requestConte2;

    const cognitoAuthenticationProvider = (_ctx$req$requestConte = ctx.req.requestContext) === null || _ctx$req$requestConte === void 0 ? void 0 : (_ctx$req$requestConte2 = _ctx$req$requestConte.identity) === null || _ctx$req$requestConte2 === void 0 ? void 0 : _ctx$req$requestConte2.cognitoAuthenticationProvider.split(',');
    const userInfo = cognitoAuthenticationProvider[1].split(':');
    const userSub = userInfo[userInfo.length - 1];
    const client = new _clientCognitoIdentityProvider.CognitoIdentityProviderClient({});
    const command = new _clientCognitoIdentityProvider.ListUsersCommand({
      UserPoolId: ctx.state.config.cognitoUserPoolId,
      Filter: `sub = "${userSub}"`
    });
    const {
      Users
    } = yield client.send(command);
    return Users === null || Users === void 0 ? void 0 : Users.map(_utils.convertToAuthenticatedUser)[0];
  });

  return function getCognitoUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCognitoUser = getCognitoUser;