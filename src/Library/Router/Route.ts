import { RequestMethods } from '../Server';

export class Route {
  public static method (method: string, route: string, controller: string | { new() : Object }, action: string): {} {
    return { method, route, controller, action };
  }

  public static get (route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Get, route, controller, action);
  }

  public static post (route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Post, route, controller, action);
  }

  public static put (route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Put, route, controller, action);
  }

  public static patch (route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Patch, route, controller, action);
  }

  public static delete (route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Delete, route, controller, action);
  }
}
