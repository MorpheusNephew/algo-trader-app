import winston from 'winston';

const _getLogger = (lambda: string) => {
  return winston.createLogger({
    defaultMeta: { lambda },
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
  });
};

let _loggerInstance: winston.Logger = null;

export default class Logger {
  static getLogger(lambda: string = 'function-layer') {
    if (!_loggerInstance) {
      _loggerInstance = _getLogger(lambda);
    }

    return _loggerInstance;
  }
}

export const getLogger = () => {
  return Logger.getLogger();
};
