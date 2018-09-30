import { ContextInterface } from '../Interface';

export interface MiddlewareInterface {
  pass (ctx?: ContextInterface, next?: Function): any;
}
