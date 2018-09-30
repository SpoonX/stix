import { AbstractMiddleware } from './AbstractMiddleware';
import { ContextInterface } from '../Interface';
import { Response, ResponseService } from '../Response';
import { InvalidActionResultError } from '../Error';
import { createDebugLogger } from '../../debug';
import { inject } from '../ServiceManager/decorators';
import { LoggerService } from '../Logger';

const debug = createDebugLogger('middleware:dispatch');

export class DispatchMiddleware extends AbstractMiddleware {
  @inject(ResponseService)
  private responseService: ResponseService;

  @inject(LoggerService)
  private logger: LoggerService;

  public async pass (ctx: ContextInterface, next: Function) {
    if (ctx.state.response) {
      debug('Response found on context, calling next.');

      return next();
    }

    const { controller, action, controllerName } = ctx.state.dispatch;

    debug(`Dispatching ${controllerName}.${action}.`);

    // Route found, controller found... but the action doesn't exist. Or isn't a method.
    if (typeof (controller as any)[action] as any !== 'function') {
      debug(`${controllerName}.${action} not found, calling next.`);

      this.logger.error(`Action "${action}" not found on controller "${controllerName}" for request path "${ctx.path}".`);

      ctx.state.response = this.responseService.serverError().notImplemented();

      return next();
    }

    let response;

    try {
      response = await (controller as any)[action](ctx);

      if (!(response instanceof Response)) {
        throw new InvalidActionResultError([
          `Action "${controllerName}.${action}" failed to produce a Response instance,`,
          `instead got type "${typeof response}".`,
          'Did you forget to add a return statement in front of your response?',
        ].join(' '));
      }
    } catch (error) {
      this.logger.error(error.message, error);

      response = this.responseService.serverError().internalServerError(null, null, { error });
    }

    ctx.state.response = response;

    debug(`Dispatched ${controllerName}.${action}, calling next.`);

    next();
  }
}
