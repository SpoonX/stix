import { RouterService } from '../Router';
import { ServerService } from '../Server';
import { ControllerManager } from '../Controller';
import { ResponseService } from '../Response';
import { ModuleManager, ModuleManagerFactory } from '../ModuleManager';
import { Config, ConfigType } from '../Config';
import { FactoryInterface, ServiceManager } from '../ServiceManager';
import { EventManager, EventManagerFactory, SharedEventManager } from '../EventManager';
import { ApplicationEvents } from './ApplicationEvents';
import { Instantiable } from '../Core';
import { LoggerService } from '../Logger';
import { createDebugLogger } from '../../debug';
import * as defaultConfig from '../../config';
import { CliService } from '../Cli';
import { ApplicationModes } from './ApplicationModes';

const debug = createDebugLogger('application');

export class Application {
  private mode: ApplicationModes;

  private readonly config: Config;

  private readonly serviceManager: ServiceManager;

  private readonly applicationConfigs: ConfigType[];

  private logger: LoggerService;

  private router : RouterService;

  private server: ServerService;

  private cli: CliService;

  private controllerManager: ControllerManager;

  private responseService: ResponseService;

  private moduleManager: ModuleManager;

  private sharedEventManager: SharedEventManager;

  public constructor (...appConfigs: ConfigType[]) {
    this.applicationConfigs = appConfigs;
    this.config             = new Config(defaultConfig, ...this.applicationConfigs);
    this.serviceManager     = new ServiceManager({
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

  private async bootstrap (mode: ApplicationModes): Promise<this> {
    const config = this.config;

    // Make the module manager. Only one level is allowed to specify module configs..
    this.moduleManager = this.serviceManager.get(ModuleManager);

    // Initialize module manager. Only calls getConfig()
    await this.moduleManager.loadModules(config.of('modules'));

    // Now let's patch on the user config once more, to ensure dominance.
    this.config.merge(...this.applicationConfigs);

    // Now that we have all the configs, register the services.
    this.serviceManager.configure(config.of('services'));

    // go forth and create all core services.
    this.logger             = this.serviceManager.get(LoggerService);
    this.sharedEventManager = this.serviceManager.get(SharedEventManager);
    this.controllerManager  = this.serviceManager.get(ControllerManager);

    if (mode === ApplicationModes.Cli) {
      await this.bootstrapCli();
    } else {
      await this.bootstrapServer();
    }

    // @todo Raphaela, liefje, this needs to not run if it's a help command. That's why the CommandManager needs to exit when it knows what to do.
    // @todo If not help, listen for ApplicationEvents.Ready in the CommandManager and dispatch on that event.
    // Cool cool. Bootstrap the modules, because they can now get all the things.
    await this.moduleManager.bootstrap();

    // Allow listeners to do some work before starting the server.
    await this.sharedEventManager.trigger(ApplicationEvents.Ready, this);

    return this;
  }

  // @todo rename to bootstrapCommands and init the initialize method here (output if command is help).
  private async bootstrapCli () {
    this.cli = this.serviceManager.get(CliService);

    return await this.cli.initialize(this.config.of('cli'));
  }

  private async bootstrapServer () {
    this.router          = this.serviceManager.get(RouterService);
    this.server          = this.serviceManager.get(ServerService);
    this.responseService = this.serviceManager.get(ResponseService);

    // Now it's our turn. Modules had their chance, now we get to register our default middleware.
    return await this.server.initialize(this.config.of('server'));
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

  public getMode (): ApplicationModes {
    return this.mode;
  }

  public async launch (mode: ApplicationModes = ApplicationModes.Server): Promise<this> {
    this.config.merge({ application: { mode } });

    debug(`Launching in ${mode} mode`);

    await this.bootstrap(mode);

    if (mode === ApplicationModes.Server) {
      this.server.start();
    }

    debug('Application ready.');

    return this;
  }
}
