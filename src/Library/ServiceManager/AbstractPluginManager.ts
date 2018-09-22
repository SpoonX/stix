import { ServiceManager } from './ServiceManager';
import { ServiceManagerConfigType } from './ServiceManagerConfigInterface';

export abstract class AbstractPluginManager extends ServiceManager {
  protected creationContext: ServiceManager;

  constructor (creationContext: ServiceManager, config?: ServiceManagerConfigType) {
    super(config);

    this.creationContext = creationContext;
  }
}
