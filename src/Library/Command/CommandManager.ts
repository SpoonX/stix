import { CommandManagerConfigType } from './CommandManagerConfigType';
import { ServiceManager, AbstractFileBasedPluginManager } from '../ServiceManager';
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
