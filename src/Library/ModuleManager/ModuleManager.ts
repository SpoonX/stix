import { Config, ModuleManagerConfigInterface } from '../Config';
import { EventManager } from '../EventManager';
import { ModuleManagerEvents } from './ModuleManagerEvents';
import { ModuleClassInterface } from './ModuleClassInterface';
import { Application, ApplicationModes, ApplicationConfigType } from '../Application';
import { createDebugLogger } from '../../debug';

const debug = createDebugLogger('modules');

export class ModuleManager {
  private readonly config: Config;

  private readonly eventManager: EventManager;

  private readonly application: Application;

  constructor (application: Application, eventManager: EventManager, config: Config) {
    this.application  = application;
    this.eventManager = eventManager;
    this.config       = config;
  }

  public async bootstrap () {
    return await this.eventManager.trigger(ModuleManagerEvents.OnBootstrap, this);
  }

  public async loadModule (ModuleClass: ModuleClassInterface): Promise<this> {
    debug('Loading module ' + ModuleClass.name);

    const mode         = this.config.of<ApplicationConfigType>('application').mode;
    const eventManager = this.eventManager;
    const module       = new ModuleClass();

    if (typeof module.getConfig === 'function') {
      this.config.merge(await module.getConfig(mode));
    }

    if (mode === ApplicationModes.Cli && typeof module.getCliConfig === 'function') {
      this.config.merge(await module.getCliConfig());
    }

    if (mode === ApplicationModes.Server && typeof module.getServerConfig === 'function') {
      this.config.merge(await module.getServerConfig());
    }

    if (typeof module.init === 'function') {
      await module.init(this);
    }

    // Allow for a convenience onBootstrap method.
    if (typeof module.onBootstrap === 'function' && !eventManager.has(ModuleManagerEvents.OnBootstrap, module.onBootstrap)) {
      debug(`Auto-attaching onBootstrap listener for ${ModuleClass.name}.`);
      eventManager.attachOnce(ModuleManagerEvents.OnBootstrap, module.onBootstrap);
    }

    debug('Initialized module ' + ModuleClass.name);

    return this;
  }

  public getEventManager (): EventManager {
    return this.eventManager;
  }

  public getApplication (): Application {
    return this.application;
  }

  public async loadModules (config: ModuleManagerConfigInterface): Promise<this> {
    debug('Loading modules');

    if (!config) {
      debug('No modules registered.');

      return;
    }

    for(let i = 0; i < config.length; i++) {
      await this.loadModule(config[i]);
    }

    debug('Loaded modules');

    return this;
  }
}
