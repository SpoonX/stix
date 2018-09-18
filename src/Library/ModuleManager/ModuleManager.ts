import { Application } from '../Application';
import { ModuleClassInterface } from './ModuleClassInterface';
import { ModuleManagerConfigInterface } from '../Config';
import createDebugLogger from '../../debug';

const debug = createDebugLogger('modules');

export class ModuleManager {
  private readonly application: Application;

  private readonly config: ModuleManagerConfigInterface;

  constructor(application: Application, config: ModuleManagerConfigInterface) {
    this.application = application;
    this.config      = config;
  }

  public async initialize(): Promise<this> {
    debug('Initializing');

    return await this.loadModules(this.config);
  }

  public async loadModule(ModuleClass: ModuleClassInterface): Promise<this> {
    debug('Loading module ' + ModuleClass.name);

    const module = new ModuleClass(this.application);

    await module.bootstrap();

    debug('Bootstrapped module ' + ModuleClass.name);

    return this;
  }

  public async loadModules(config: ModuleManagerConfigInterface): Promise<this> {
    debug('Loading modules');

    for(let i = 0; i < config.length; i++) {
      await this.loadModule(config[i]);
    }

    debug('Loaded modules');

    return this;
  }
}
