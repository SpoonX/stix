import { ModuleManager } from './ModuleManager';
import { Event } from '../EventManager';

export interface ModuleInterface {
  onBootstrap?: (event?: Event<any>) => void | Promise<any>;
  getConfig?: () => { [key: string]: any } | Promise<{ [key: string]: any }>;
  init?: (moduleManager?: ModuleManager) => void;
}


