import { ServiceManagerInterface } from '../ServiceManager';
import { ServerService } from './ServerService';
import { Application } from '../Application';

export const ServerServiceFactory = (sm: ServiceManagerInterface) => {
  return new ServerService(sm.get(Application));
};
