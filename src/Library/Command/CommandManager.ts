import { CommandManagerConfigType } from './CommandManagerConfigType';
import { ServiceManager } from '../ServiceManager';
import { AbstractFileBasedPluginManager } from '../ServiceManager/AbstractFileBasedPluginManager';
import { Instantiable } from '../Core';
import { AbstractCommand } from './AbstractCommand';

export class CommandManager extends AbstractFileBasedPluginManager {
  constructor (creationContext: ServiceManager, config: CommandManagerConfigType) {
    super(creationContext, config.locations, config.commands);
  }

  public getCommand (Command: AbstractCommand): Object {
    return this.getPlugin(Command as Instantiable<Object>);
  }
}
