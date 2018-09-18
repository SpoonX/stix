import { Middleware } from 'koa';
import { ContextInterface, Application, InvalidActionResultError, Response } from '../Library';

export default (app: Application): Middleware => async function dispatch (ctx: ContextInterface, next: Function) {
  // Dispatch needs to be the last middleware to run.
  // This leaves space for module-land and user-land middleware to run first.
  await next();

  if (ctx.state.response) {
    return;
  }

  const { controller, action, controllerName } = ctx.state.dispatch;
  const logger                                 = app.getLogger();
  const serverError                            = app.getResponseManager().serverError();

  // Route found, controller found... but the action doesn't exist. Or isn't a method.
  if (typeof controller[action] !== 'function') {
    logger.error(`Action "${action}" not found on controller "${controllerName}" for request path "${ctx.path}".`);

    ctx.state.response = serverError.notImplemented();

    return;
  }

  let response;

  try {
    response = await controller[action](ctx);

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
};
