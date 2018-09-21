import winston from 'winston';
import { RouterService } from '../Router';
import { ServerService } from '../Server';
import { ControllerManager } from '../Controller';
import { ResponseService } from '../Response/ResponseService';
import { ModuleManager } from '../ModuleManager';
import * as defaultConfig from '../../config';
import createDebugLogger from '../../debug';
import {
  ResponseConfigInterface,
  LoggerConfigInterface,
  Config,
  ConfigType,
  ModuleManagerConfigInterface,
} from '../Config';
import { ServiceManager } from '../ServiceManager';

const debug = createDebugLogger('application');

export class Application {
  private readonly config: Config;

  private logger: winston.Logger;

  private router : RouterService;

  private server: ServerService;

  private controllerManager: ControllerManager;

  private ResponseService: ResponseService;

  private moduleManager: ModuleManager;

  private serviceManager: ServiceManager;

  public constructor(appConfig: ConfigType) {
    const config = new Config(defaultConfig, appConfig);
    const serviceManager = new ServiceManager({
      aliases: { config: Config },
      services: new Map<Function, Object>([
        [ Config, config ],
        [ Application, this ],
      ]),
    });

    serviceManager.configure(config.of('services'));

    this.serviceManager = serviceManager;
    this.config = config;
  }

  private async bootstrap(config: Config): Promise<this> {
    this.logger            = winston.createLogger(config.of<LoggerConfigInterface>('logger'));
    this.router            = this.serviceManager.get(RouterService);
    this.server            = this.serviceManager.get(ServerService);
    this.controllerManager = this.serviceManager.get(ControllerManager);
    this.ResponseService   = this.serviceManager.get(ResponseService);
    this.moduleManager     = new ModuleManager(this, config.of<ModuleManagerConfigInterface>('modules'));

    await this.server.initialize();
    await this.moduleManager.initialize();

    return this;
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }

  public getRouter(): RouterService {
    return this.router;
  }

  public getServer(): ServerService {
    return this.server;
  }

  public getControllerManager(): ControllerManager {
    return this.controllerManager;
  }

  public getModuleManager(): ModuleManager {
    return this.moduleManager;
  }

  public getResponseService(): ResponseService {
    return this.ResponseService;
  }

  public getConfig<T>(section: string): T {
    return this.config.of<T>(section);
  }

  public async launch(): Promise<this> {
    debug('Launching server');

    await this.bootstrap(this.config);

    this.server.start();

    debug('Server ready');

    return this;
  }
}
