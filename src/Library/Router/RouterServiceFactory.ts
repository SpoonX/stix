import { RouterService } from './RouterService';
import { Config, RouterConfigInterface } from '../Config';
import { ServiceManager } from '../ServiceManager';
import { FactoryInterface } from '../ServiceManager';

export const RouterServiceFactory: FactoryInterface = (sm: ServiceManager) => {
  return new RouterService(sm.get(Config).of<RouterConfigInterface>('router'));
};
