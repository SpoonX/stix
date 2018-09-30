import { ControllerManagerConfigType } from '../Config';
import { ServiceManager } from '../ServiceManager';
import { AbstractFileBasedPluginManager } from '../ServiceManager/AbstractFileBasedPluginManager';
import { Instantiable } from '../Core';

export class ControllerManager extends AbstractFileBasedPluginManager {
  constructor (creationContext: ServiceManager, config: ControllerManagerConfigType) {
    super(creationContext, config.locations, config.controllers);
  }

  public getController (Controller: Instantiable<Object>): Object {
    return this.getPlugin(Controller);
  }
}
