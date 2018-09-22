import { ServiceManager, FactoryInterface } from '../ServiceManager';
import { ModuleManager } from './ModuleManager';
import { Config } from '../Config';
import { EventManager } from '../EventManager';
import { Application } from '../Application';

export const ModuleManagerFactory: FactoryInterface = (sm: ServiceManager) => {
  return new ModuleManager(sm.get(Application), sm.get(EventManager), sm.get(Config));
};
