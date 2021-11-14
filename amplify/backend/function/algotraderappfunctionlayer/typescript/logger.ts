import winston from 'winston';

export const getLoggerInternal = (lambda: string) => {
  return winston.createLogger({
    defaultMeta: { lambda },
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
  });
};

const logger = getLoggerInternal('function-layer');

export default logger;
