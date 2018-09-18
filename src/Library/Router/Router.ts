import pathToRegexp, { Key } from 'path-to-regexp';
import { RequestMethods } from '../Server';
import { RegisteredRouteInterface } from './RegisteredRouteInterface';
import { RouteInterface } from './RouteInterface';
import { RouterConfigInterface } from '../Config';

export class Router {
  private routes:Array<RegisteredRouteInterface> = [];

  private config: RouterConfigInterface;

  constructor (config: RouterConfigInterface) {
    this.config = config;

    this.registerRoutes(this.config.routes);
  }

  public resolve(method: RequestMethods, target: string): { route: RegisteredRouteInterface, parameters: {} } | null {
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];

      if (method !== route.method) {
        continue;
      }

      const parameters = this.match(target, route);

      if (parameters) {
        return { route, parameters };
      }
    }

    return null;
  }

  public match (target: string, route: RegisteredRouteInterface): {} {
    const { regex, keys } = route;
    const result          = regex.exec(target);

    if (!result) {
      return null;
    }

    // We don't care about the path.
    result.splice(0, 1);

    return this.buildParameters(keys, result);
  }

  public registerRoutes(routes: Array<RouteInterface | Array<RouteInterface>>): this {
    routes.forEach(newRoute => {
      if (Array.isArray(newRoute)) {
        return this.registerRoutes(newRoute);
      }

      const { method, route, action, controller } = newRoute;

      this.registerRoute(method, route, controller, action);
    });

    return this;
  }

  public registerRoute(method: RequestMethods, route: string, controller: { new (): Object }, action: string): this {
    const keys: Array<Key> = [];
    const regex: RegExp    = pathToRegexp(route, keys);

    this.routes.push({ regex, controller, action, keys, method });

    return this;
  }

  public buildParameters(from: Array<Key>, result: RegExpExecArray): {} {
    return result.reduce((params, match, index): {} => {
      return Object.assign(params, { [from[index].name]: match });
    }, {});
  }
}
