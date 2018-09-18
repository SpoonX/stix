import winston from 'winston';

export const logger = {
  level: 'error',
  exitOnError: false,
  transports: [ new winston.transports.Console({ format: winston.format.simple() }) ],
};
