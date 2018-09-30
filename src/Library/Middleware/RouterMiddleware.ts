import { ContextInterface } from '../Interface';
import { RequestMethods } from '../Server';
import { ControllerManager } from '../Controller';
import { createDebugLogger } from '../../debug';
import { RouterService } from '../Router';
import { inject } from '../ServiceManager/decorators';
import { ResponseService } from '../Response';
import { AbstractMiddleware } from './AbstractMiddleware';

const debug = createDebugLogger('middleware:router');

export class RouterMiddleware extends AbstractMiddleware{
  @inject(RouterService)
  private routerService: RouterService;

  @inject(ResponseService)
  private responseService: ResponseService;

  @inject(ControllerManager)
  private controllerManager: ControllerManager;

  public async pass (ctx: ContextInterface, next: Function) {
    debug(`Routing for path "${ctx.path}".`);

    const method = ctx.method === RequestMethods.Head ? RequestMethods.Get : ctx.method;
    const match  = this.routerService.resolve(method as RequestMethods, ctx.path);

    if (!match) {
      ctx.state.response = this.responseService.clientError().notFound();

      debug('No match, returning not found.');

      return;
    }

    const { route, parameters } = match;
    const controllerName        = ControllerManager.getPluginName(route.controller);
    const controller: any       = this.controllerManager.get(route.controller);

    ctx.state.params = parameters;

    ctx.state.dispatch = {
      controllerName,
      controller,
      action: route.action,
    };

    debug(`Route matched "${controllerName}.${route.action}()".`);

    return next();
  }
}
