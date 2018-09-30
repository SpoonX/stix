import { FactoryInterface, ServiceManager } from '../ServiceManager';
import { Config } from '../Config';
import { CliService } from './CliService';
import { CliConfigType } from './CliConfigType';
import { CommandManager } from '../Command';

export const CliServiceFactory: FactoryInterface = (sm: ServiceManager) => {
  return new CliService(sm.get(CommandManager), sm.get(Config).of<CliConfigType>('cli'));
};
