"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getLoggerInternal = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLoggerInternal = lambda => {
  return _winston.default.createLogger({
    defaultMeta: {
      lambda
    },
    transports: [new _winston.default.transports.Console()],
    exceptionHandlers: [new _winston.default.transports.Console()]
  });
};

exports.getLoggerInternal = getLoggerInternal;
const logger = getLoggerInternal('function-layer');
var _default = logger;
exports.default = _default;