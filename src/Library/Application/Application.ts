import winston from 'winston';
import { RouterService } from '../Router';
import { ServerService } from '../Server';
import { ControllerManager } from '../Controller';
import { ResponseService } from '../Response';
import { ModuleManager, ModuleManagerFactory } from '../ModuleManager';
import * as defaultConfig from '../../config';
import createDebugLogger from '../../debug';
import {
  Config,
  ConfigType,
} from '../Config';
import { FactoryInterface, ServiceManager } from '../ServiceManager';
import { EventManager, EventManagerFactory, SharedEventManager } from '../EventManager';
import { ApplicationEvents } from './ApplicationEvents';
import { Instantiable } from '../Core';
import { LoggerService } from '../Logger/LoggerService';

const debug = createDebugLogger('application');

export class Application {
  private readonly config: Config;

  private readonly serviceManager: ServiceManager;

  private logger: LoggerService;

  private router : RouterService;

  private server: ServerService;

  private controllerManager: ControllerManager;

  private responseService: ResponseService;

  private moduleManager: ModuleManager;

  private sharedEventManager: SharedEventManager;

  public constructor (appConfig: ConfigType) {
    this.config         = new Config(defaultConfig, appConfig);
    this.serviceManager = new ServiceManager({
      aliases: { config: Config, sharedEventManager: SharedEventManager },
      invokables: new Map<Instantiable<Object>, Instantiable<Object>>([
        [ SharedEventManager, SharedEventManager ],
      ]),
      factories: new Map<Function, FactoryInterface>([
        [ ModuleManager, ModuleManagerFactory ],
        [ EventManager, EventManagerFactory ],
      ]),
      services: new Map<Function, Object>([
        [ Config, this.config ],
        [ Application, this ],
      ]),
      shared: new Map<Function, boolean>([
        [ EventManager, false ],
      ]),
    });
  }

  private async bootstrap (): Promise<this> {
    const config = this.config;

    // Make the module manager. Only one level is allowed to specify module configs..
    this.moduleManager = this.serviceManager.get(ModuleManager);

    // Initialize module manager. Only calls getConfig()
    await this.moduleManager.loadModules(config.of('modules'));

    // Now that we have all the configs, register the services.
    this.serviceManager.configure(config.of('services'));

    // go forth and create all core services.
    this.logger             = this.serviceManager.get(LoggerService);
    this.router             = this.serviceManager.get(RouterService);
    this.server             = this.serviceManager.get(ServerService);
    this.responseService    = this.serviceManager.get(ResponseService);
    this.controllerManager  = this.serviceManager.get(ControllerManager);
    this.sharedEventManager = this.serviceManager.get(SharedEventManager);

    // Now it's our turn. Modules had their chance, now we get to register our default middleware.
    await this.server.initialize(config.of('server'));

    // Cool cool. Bootstrap the modules, because they can now get all the things.
    await this.moduleManager.bootstrap();

    // Allow listeners to do some work before starting the server.
    await this.sharedEventManager.trigger(ApplicationEvents.Ready, this);

    return this;
  }

  public getLogger (): LoggerService {
    return this.logger;
  }

  public getRouter (): RouterService {
    return this.router;
  }

  public getServer (): ServerService {
    return this.server;
  }

  public getControllerManager (): ControllerManager {
    return this.controllerManager;
  }

  public getModuleManager (): ModuleManager {
    return this.moduleManager;
  }

  public getResponseService (): ResponseService {
    return this.responseService;
  }

  public getServiceManager (): ServiceManager {
    return this.serviceManager;
  }

  public getConfigOf<T> (section: string): T {
    return this.config.of<T>(section);
  }

  public getConfig (): Config {
    return this.config;
  }

  public async launch (): Promise<this> {
    debug('Launching server');

    await this.bootstrap();

    this.server.start();

    debug('Server ready');

    return this;
  }
}
