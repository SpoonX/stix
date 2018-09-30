import { ContextInterface } from '../Interface';
import { MiddlewareType } from './MiddlewareTypes';

export abstract class AbstractMiddleware {
  abstract pass (ctx?: ContextInterface, next?: Function): any;

  public asCallback (): MiddlewareType {
    const callback: MiddlewareType = (context: ContextInterface, next: () => Promise<any>) => this.pass(context, next);

    callback._name      = this.constructor.name;
    callback._fromClass = this.constructor as typeof AbstractMiddleware;

    return callback;
  }
}
