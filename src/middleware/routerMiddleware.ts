import { ContextInterface, ControllerManager, Application } from '../Library';
import { RequestMethods } from '../Library/Server';
import { createDebugLogger } from '../debug';

const debug = createDebugLogger('middleware:router');

export const routerMiddleware = (app: Application) => async function router (ctx: ContextInterface, next: Function) {
  debug(`Routing for path "${ctx.path}".`);

  const method = ctx.method === RequestMethods.Head ? RequestMethods.Get : ctx.method;
  const match  = app.getRouter().resolve(method as RequestMethods, ctx.path);

  if (!match) {
    ctx.state.response = app.getResponseService().clientError().notFound();

    debug('No match, returning not found.');

    return;
  }

  const { route, parameters } = match;
  const controllerName        = ControllerManager.getControllerName(route.controller);
  const controller: any       = app.getControllerManager().get(route.controller);

  ctx.state.params = parameters;

  ctx.state.dispatch = {
    controllerName,
    controller,
    action: route.action,
  };

  debug(`Route matched "${controllerName}.${route.action}()".`);

  return next();
};
