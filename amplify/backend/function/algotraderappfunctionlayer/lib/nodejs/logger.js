"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _getLogger = lambda => {
  return _winston.default.createLogger({
    defaultMeta: {
      lambda
    },
    transports: [new _winston.default.transports.Console()],
    exceptionHandlers: [new _winston.default.transports.Console()]
  });
};

let _loggerInstance = null;

class Logger {
  static getLogger(lambda = 'function-layer') {
    if (!_loggerInstance) {
      _loggerInstance = _getLogger(lambda);
    }

    return _loggerInstance;
  }

}

exports.default = Logger;