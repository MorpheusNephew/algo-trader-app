"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cognito = require("../services/cognito");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const checkUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const authenticatedUser = yield (0, _cognito.getCognitoUser)(ctx);

    if (!authenticatedUser) {
      ctx.throw('User not found', 404);
    }

    ctx.state.authenticatedUser = authenticatedUser;
    yield next();
  });

  return function checkUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = checkUser;
exports.default = _default;