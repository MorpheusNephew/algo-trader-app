"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

var _router = _interopRequireDefault(require("@koa/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _router.default().use(_api.default.routes());
var _default = router;
exports.default = _default;