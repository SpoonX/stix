import { ControllerManagerConfigType } from '../Config';
import { ServiceManager, AbstractFileBasedPluginManager } from '../ServiceManager';
import { Instantiable } from '../Core';
import { createDebugLogger } from '../../debug';

const debug = createDebugLogger('controllerManager');

export class ControllerManager extends AbstractFileBasedPluginManager {
  constructor (creationContext: ServiceManager, config: ControllerManagerConfigType = {}) {
    const { locations, controllers } = config;

    debug('Loading controllers');

    super(creationContext, locations, controllers);

    debug('Finished loading controllers');
  }

  public getController (Controller: Instantiable<Object>): Object {
    return this.getPlugin(Controller);
  }
}
