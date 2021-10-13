"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTdConnections = void 0;

var _connectiondb = require("/opt/nodejs/connectiondb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const loadTdConnections = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const {
      authenticatedUser: {
        username
      }
    } = ctx.state;
    const connections = yield (0, _connectiondb.getConnections)({
      username,
      connectionType: 'td'
    });
    ctx.state.connections = connections ?? [];
    yield next();
  });

  return function loadTdConnections(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadTdConnections = loadTdConnections;