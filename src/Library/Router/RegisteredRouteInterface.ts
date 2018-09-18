import { RequestMethods } from '../Server/RequestMethods';
import { Key } from 'path-to-regexp';

export interface RegisteredRouteInterface {
  method: RequestMethods;
  regex: RegExp;
  controller: { new (): Object };
  action: string;
  keys: Array<Key>;
}
