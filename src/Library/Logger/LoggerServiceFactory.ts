import { ServiceManager } from '../ServiceManager';
import { Config, LoggerConfigInterface } from '../Config';
import { LoggerService } from './LoggerService';

export const LoggerServiceFactory = (sm: ServiceManager) => {
  return new LoggerService(sm.get(Config).of<LoggerConfigInterface>('logger'));
};
