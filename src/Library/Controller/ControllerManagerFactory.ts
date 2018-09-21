import { FactoryInterface } from '../ServiceManager/FactoryInterface';
import { ServiceManager } from '../ServiceManager';
import { ControllerManager } from './ControllerManager';
import { Config, ControllerManagerConfigType } from '../Config';

export const ControllerManagerFactory: FactoryInterface = (sm: ServiceManager) => {
  return new ControllerManager(sm, sm.get(Config).of<ControllerManagerConfigType>('controller'));
};
