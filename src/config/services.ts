import { ServerService, ServerServiceFactory } from '../Library/Server';
import { RouterService, RouterServiceFactory } from '../Library/Router';
import { FactoryInterface } from '../Library/ServiceManager';
import { ControllerManager, ControllerManagerFactory } from '../Library/Controller';
import { ResponseService, ResponseServiceFactory } from '../Library/Response';

export const services = {
  factories: new Map<Function,FactoryInterface>([
    [ ServerService, ServerServiceFactory ],
    [ RouterService, RouterServiceFactory ],
    [ ControllerManager, ControllerManagerFactory ],
    [ ResponseService, ResponseServiceFactory ],
  ]),
};
