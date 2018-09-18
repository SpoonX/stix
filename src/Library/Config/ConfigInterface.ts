import { ServerConfigInterface } from './ServerConfigInterface';
import { ControllerManagerConfigInterface } from './ControllerManagerConfigInterface';
import { ModuleManagerConfigInterface } from './ModuleManagerConfigInterface';
import { LoggerConfigInterface } from './LoggerConfigInterface';
import { ResponseConfigInterface } from './ResponseConfigInterface';
import { RouterConfigInterface } from './RouterConfigInterface';

export interface ConfigInterface {
  controller: ControllerManagerConfigInterface;
  response?: ResponseConfigInterface;
  router?: RouterConfigInterface;
  logger?: LoggerConfigInterface;
  server?: ServerConfigInterface;
  modules?: ModuleManagerConfigInterface;
  [key: string]: any;
}
