import { Logger as WinstonLogger } from 'winston';
import { LoggerConfigInterface } from '../Config';
import winston from 'winston';

export class LoggerService {
  private readonly adapter: WinstonLogger;

  constructor (config: LoggerConfigInterface) {
    this.adapter = winston.createLogger(config);
  }

  public getAdapter (): WinstonLogger {
    return this.adapter;
  }

  log (level: string | object, message?: any, ...logArguments: any[]): this {
    this.adapter.log(level as string, message, ...logArguments);

    return this;
  }

  error (message: string | object, ...logArguments: any[]): this {
    return this.log('error', message, ...logArguments);
  }

  warn (message: string | object, ...logArguments: any[]): this {
    return this.log('warn', message, ...logArguments);
  }

  help (message: string | object, ...logArguments: any[]): this {
    return this.log('help', message, ...logArguments);
  }

  data (message: string | object, ...logArguments: any[]): this {
    return this.log('data', message, ...logArguments);
  }

  info (message: string | object, ...logArguments: any[]): this {
    return this.log('info', message, ...logArguments);
  }

  debug (message: string | object, ...logArguments: any[]): this {
    return this.log('debug', message, ...logArguments);
  }

  prompt (message: string | object, ...logArguments: any[]): this {
    return this.log('prompt', message, ...logArguments);
  }

  http (message: string | object, ...logArguments: any[]): this {
    return this.log('http', message, ...logArguments);
  }

  verbose (message: string | object, ...logArguments: any[]): this {
    return this.log('verbose', message, ...logArguments);
  }

  input (message: string | object, ...logArguments: any[]): this {
    return this.log('input', message, ...logArguments);
  }

  silly (message: string | object, ...logArguments: any[]): this {
    return this.log('silly', message, ...logArguments);
  }

  emerg (message: string | object, ...logArguments: any[]): this {
    return this.log('emerg', message, ...logArguments);
  }

  alert (message: string | object, ...logArguments: any[]): this {
    return this.log('alert', message, ...logArguments);
  }

  crit (message: string | object, ...logArguments: any[]): this {
    return this.log('crit', message, ...logArguments);
  }

  warning (message: string | object, ...logArguments: any[]): this {
    return this.log('warning', message, ...logArguments);
  }

  notice (message: string | object, ...logArguments: any[]): this {
    return this.log('notice', message, ...logArguments);
  }
}
