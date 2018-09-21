import { ServiceManagerInterface } from '../ServiceManager/ServiceManagerInterface';
import { ServerService } from './ServerService';
import { Application } from '../Application';
import { Config, ServerConfigInterface } from '../Config';

export const ServerServiceFactory = (sm: ServiceManagerInterface) => {
  return new ServerService(sm.get(Application), sm.get(Config).of<ServerConfigInterface>('server'));
};
