import { RequestMethods } from '../Server/RequestMethods';

export interface RouteInterface {
  method: RequestMethods;
  route: string;
  controller: { new (): Object };
  action: string;
}
