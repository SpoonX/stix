import { RequestMethods } from '../Server';
import { Key } from 'path-to-regexp';
import { AbstractActionController } from '../Controller';

export interface RegisteredRouteInterface {
  method: RequestMethods;
  regex: RegExp;
  controller: typeof AbstractActionController;
  action: string;
  keys: Array<Key>;
}
