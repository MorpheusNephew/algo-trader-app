"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLogger = (lambda = 'function-layer') => {
  const logger = _winston.default.createLogger({
    defaultMeta: {
      lambda
    },
    transports: [new _winston.default.transports.Console()],
    exceptionHandlers: [new _winston.default.transports.Console()]
  });

  return logger;
};

exports.getLogger = getLogger;