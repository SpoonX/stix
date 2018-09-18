import winston from 'winston';
import { Router } from '../Router';
import { Server } from '../Server';
import { ControllerManager } from '../Controller';
import { ResponseManager } from '../Response/ResponseManager';
import { ModuleManager } from '../ModuleManager';
import * as defaultConfig from '../../config';
import createDebugLogger from '../../debug';
import {
  ResponseConfigInterface,
  LoggerConfigInterface,
  Config,
  ConfigInterface,
  ServerConfigInterface,
  RouterConfigInterface,
  ControllerManagerConfigInterface,
  ModuleManagerConfigInterface,
} from '../Config';

const debug = createDebugLogger('application');

export class Application {
  private config: Config;

  private logger: winston.Logger;

  private router: Router;

  private server: Server;

  private controllerManager: ControllerManager;

  private responseManager: ResponseManager;

  private moduleManager: ModuleManager;

  public constructor(config: ConfigInterface) {
    this.config = new Config({});

    this.config.merge(this.config, defaultConfig, config);
  }

  private async bootstrap(config: Config): Promise<this> {
    this.logger            = winston.createLogger(config.of<LoggerConfigInterface>('logger'));
    this.router            = new Router(config.of<RouterConfigInterface>('router'));
    this.server            = new Server(this, config.of<ServerConfigInterface>('server'));
    this.controllerManager = new ControllerManager(config.of<ControllerManagerConfigInterface>('controller'));
    this.responseManager   = new ResponseManager(config.of<ResponseConfigInterface>('response'));
    this.moduleManager     = new ModuleManager(this, config.of<ModuleManagerConfigInterface>('modules'));

    await this.server.initialize();
    await this.moduleManager.initialize();

    return this;
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }

  public getRouter(): Router {
    return this.router;
  }

  public getServer(): Server {
    return this.server;
  }

  public getControllerManager(): ControllerManager {
    return this.controllerManager;
  }

  public getResponseManager(): ResponseManager {
    return this.responseManager;
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
