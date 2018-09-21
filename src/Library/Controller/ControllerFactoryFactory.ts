import { ServiceManager } from '../ServiceManager';
import { ResponseService } from '../Response';
import { AbstractActionController } from './AbstractActionController';

export const ControllerFactoryFactory = (Controller: typeof AbstractActionController) => {
  return (sm: ServiceManager) => new Controller(sm.get(ResponseService));
};
