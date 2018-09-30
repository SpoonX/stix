import { FactoryInterface, ServiceManager } from '../ServiceManager';
import { CommandManager } from './CommandManager';
import { CommandManagerConfigType } from './CommandManagerConfigType';
import { Config } from '../Config';

export const CommandManagerFactory: FactoryInterface = (sm: ServiceManager) => {
  return new CommandManager(sm, sm.get(Config).of<CommandManagerConfigType>('command'));
};
