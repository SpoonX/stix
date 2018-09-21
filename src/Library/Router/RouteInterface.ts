import { RequestMethods } from '../Server';
import { AbstractActionController } from '../Controller';

export interface RouteInterface {
  method: RequestMethods;
  route: string;
  controller: typeof AbstractActionController;
  action: string;
}
