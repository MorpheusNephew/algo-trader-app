import winston from 'winston';

export const getLogger = (lambda: string = 'function-layer') => {
  const logger = winston.createLogger({
    defaultMeta: { lambda },
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
  });

  return logger;
};
