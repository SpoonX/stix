import Koa from 'koa';

export interface ContextInterface extends Koa.Context {
  params?: { [key: string]: any };
  [key: string]: any;
}
