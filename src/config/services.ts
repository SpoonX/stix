import { ServerService, ServerServiceFactory } from '../Library/Server';
import { RouterService, RouterServiceFactory } from '../Library/Router';
import { FactoryInterface } from '../Library/ServiceManager';
import { ControllerManager, ControllerManagerFactory } from '../Library/Controller';
import { CommandManager, CommandManagerFactory } from '../Library/Command';
import { ResponseService, ResponseServiceFactory } from '../Library/Response';
import { LoggerService, LoggerServiceFactory } from '../Library/Logger';
import { CliService, CliServiceFactory } from '../Library/Cli';
import { DispatchMiddleware, RequestMiddleware, RouterMiddleware } from '../Library/Middleware';

export const services = {
  invokables: new Map<Function, Function>([
    [ RouterMiddleware, RouterMiddleware ],
    [ RequestMiddleware, RequestMiddleware ],
    [ DispatchMiddleware, DispatchMiddleware ],
  ]),
  factories: new Map<Function,FactoryInterface>([
    [ CliService, CliServiceFactory ],
    [ ServerService, ServerServiceFactory ],
    [ RouterService, RouterServiceFactory ],
    [ CommandManager, CommandManagerFactory ],
    [ ControllerManager, ControllerManagerFactory ],
    [ ResponseService, ResponseServiceFactory ],
    [ LoggerService, LoggerServiceFactory ],
  ]),
};
