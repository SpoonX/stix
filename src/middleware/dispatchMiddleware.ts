import { ContextInterface, Application, InvalidActionResultError, Response } from '../Library';
import { createDebugLogger } from '../debug';

const debug = createDebugLogger('middleware:dispatch');

export const dispatchMiddleware = (app: Application) => async function dispatch (ctx: ContextInterface, next: Function) {
  if (ctx.state.response) {
    debug('Response found on context, calling next.');

    return next();
  }

  const { controller, action, controllerName } = ctx.state.dispatch;
  const logger                                 = app.getLogger();
  const serverError                            = app.getResponseService().serverError();

  debug(`Dispatching ${controllerName}.${action}.`);

  // Route found, controller found... but the action doesn't exist. Or isn't a method.
  if (typeof (controller as any)[action] as any !== 'function') {
    debug(`${controllerName}.${action} not found, calling next.`);

    logger.error(`Action "${action}" not found on controller "${controllerName}" for request path "${ctx.path}".`);

    ctx.state.response = serverError.notImplemented();

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
    logger.error(error.message, error);

    response = serverError.internalServerError(null, null, { error });
  }

  ctx.state.response = response;

  debug(`Dispatched ${controllerName}.${action}, calling next.`);

  next();
};
