import { ModuleInterface } from './ModuleInterface';
import { Application } from '../Application';

export interface ModuleClassInterface {
  new(app?: Application): ModuleInterface;
}
