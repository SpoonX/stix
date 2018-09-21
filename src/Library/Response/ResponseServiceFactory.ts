import { FactoryInterface } from '../ServiceManager/FactoryInterface';
import { ServiceManager } from '../ServiceManager';
import { ResponseService } from './ResponseService';
import { Config, ResponseConfigInterface } from '../Config';

export const ResponseServiceFactory: FactoryInterface = (sm: ServiceManager) => {
  return new ResponseService(sm.get(Config).of<ResponseConfigInterface>('response'));
};
