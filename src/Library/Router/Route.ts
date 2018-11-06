import { RequestMethods } from '../Server';
import { RouteInterface } from './RouteInterface';
import { AbstractActionController } from '../Controller';

export class Route {
  public static method (method: RequestMethods, route: string, controller: string | typeof AbstractActionController, action: string): RouteInterface {
    return { method, route, action, controller: controller as typeof AbstractActionController };
  }

  public static get (route: string, controller: string | typeof AbstractActionController, action: string): RouteInterface {
    return Route.method(RequestMethods.Get, route, controller, action);
  }

  public static post (route: string, controller: string | typeof AbstractActionController, action: string): RouteInterface {
    return Route.method(RequestMethods.Post, route, controller, action);
  }

  public static put (route: string, controller: string | typeof AbstractActionController, action: string): RouteInterface {
    return Route.method(RequestMethods.Put, route, controller, action);
  }

  public static patch (route: string, controller: string | typeof AbstractActionController, action: string): RouteInterface {
    return Route.method(RequestMethods.Patch, route, controller, action);
  }

  public static delete (route: string, controller: string | typeof AbstractActionController, action: string): RouteInterface {
    return Route.method(RequestMethods.Delete, route, controller, action);
  }
}
