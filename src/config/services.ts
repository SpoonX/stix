import { ServerService, ServerServiceFactory } from '../Library/Server';
import { RouterService, RouterServiceFactory } from '../Library/Router';
import { FactoryInterface } from '../Library/ServiceManager';
import { ControllerManager, ControllerManagerFactory } from '../Library/Controller';
import { ResponseService, ResponseServiceFactory } from '../Library/Response';
import { LoggerService, LoggerServiceFactory } from '../Library/Logger';
import { CliService } from '../Library/Cli';

export const services = {
  invokables: new Map<Function, Function>([
    [ CliService, CliService ],
  ]),
  factories: new Map<Function,FactoryInterface>([
    [ ServerService, ServerServiceFactory ],
    [ RouterService, RouterServiceFactory ],
    [ ControllerManager, ControllerManagerFactory ],
    [ ResponseService, ResponseServiceFactory ],
    [ LoggerService, LoggerServiceFactory ],
  ]),
};
