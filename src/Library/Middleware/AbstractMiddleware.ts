import { Middleware } from 'koa';
import { ContextInterface } from '../Interface';

export abstract class AbstractMiddleware  {
  abstract pass (ctx?: ContextInterface, next?: Function): any;

  public asCallback (): Middleware {
    return (context: ContextInterface, next: () => Promise<any>) => this.pass(context, next);
  }
}
