import Koa from 'koa';
import { Response } from '../Response';
import { AbstractActionController } from '../Controller';

export interface ContextInterface extends Koa.Context {
  state: {
    params?: { [key: string]: any };
    response?: Response,
    dispatch?: {
      controllerName: string;
      controller: typeof AbstractActionController;
      action: string;
    };
    [key: string]: any;
  };
  [key: string]: any;
}
