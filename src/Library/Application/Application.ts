import { ServerService } from '../Server';
import { ModuleManager, ModuleManagerFactory } from '../ModuleManager';
import { Config, ConfigType } from '../Config';
import { FactoryInterface, ServiceManager } from '../ServiceManager';
import { EventManager, EventManagerFactory, SharedEventManager } from '../EventManager';
import { ApplicationEvents } from './ApplicationEvents';
import { Instantiable } from '../Core';
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

  public getMode (): ApplicationModes {
    return this.mode;
  }

  public getServiceManager (): ServiceManager {
    return this.serviceManager;
  }

  private async bootstrap (mode: ApplicationModes, loadOnly: boolean = false): Promise<this> {
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
    this.sharedEventManager = this.serviceManager.get(SharedEventManager);

    if (mode === ApplicationModes.Cli) {
      await this.bootstrapCli();
    } else {
      this.bootstrapServer();
    }

    // Don't start the application. We're probably in CLI mode.
    if (loadOnly) {
      return this;
    }

    return await this.start();
  }

  public async start (): Promise<this> {
    // Cool cool. Bootstrap the modules, because they can now get all the things.
    await this.moduleManager.bootstrap();

    // Allow listeners to do some work before starting the server.
    await this.sharedEventManager.trigger(ApplicationEvents.Ready, this);

    return this;
  }

  private async bootstrapCli () {
    const cliService = await this.serviceManager.get(CliService);

    this.sharedEventManager.attachOnce(ApplicationEvents.Ready, () => {
      cliService.execute(process.argv.slice(2));
    });
  }

  private bootstrapServer () {
    const serverService = this.serviceManager.get(ServerService);

    this.sharedEventManager.attachOnce(ApplicationEvents.Ready, () => {
      serverService.start();
    });
  }

  public async launch (mode: ApplicationModes = ApplicationModes.Server, loadOnly: boolean = false): Promise<this> {
    this.config.merge({ application: { mode } });

    this.mode = mode;

    debug(`Launching in ${mode} mode`);

    await this.bootstrap(mode, loadOnly);

    debug('Application ready.');

    return this;
  }
}
