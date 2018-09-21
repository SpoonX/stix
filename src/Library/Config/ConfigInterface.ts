import { ServerConfigInterface } from './ServerConfigInterface';
import { ControllerManagerConfigType } from './ControllerManagerConfigType';
import { ModuleManagerConfigInterface } from './ModuleManagerConfigInterface';
import { LoggerConfigInterface } from './LoggerConfigInterface';
import { ResponseConfigInterface } from './ResponseConfigInterface';
import { RouterConfigInterface } from './RouterConfigInterface';

export type ConfigType = Partial<{
  controller: ControllerManagerConfigType;
  response: ResponseConfigInterface;
  router: RouterConfigInterface;
  logger: LoggerConfigInterface;
  server: ServerConfigInterface;
  modules: ModuleManagerConfigInterface;
  [key: string]: any;
}>;
