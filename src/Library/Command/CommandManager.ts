import { CommandManagerConfigType } from './CommandManagerConfigType';
import { ServiceManager, AbstractFileBasedPluginManager } from '../ServiceManager';
import { Instantiable } from '../Core';
import { AbstractCommand } from './AbstractCommand';

export class CommandManager extends AbstractFileBasedPluginManager {
  constructor (creationContext: ServiceManager, config: CommandManagerConfigType) {
    super(creationContext, config.locations, config.commands);
  }

  public getCommand (Command: typeof AbstractCommand): AbstractCommand {
    return this.getPlugin(Command as Instantiable<Object>);
  }
}
