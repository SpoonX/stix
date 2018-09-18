import { RequestMethods } from '../Server';

export interface RouteInterface {
  method: RequestMethods;
  route: string;
  controller: { new (): Object };
  action: string;
}
