import { RequestMethods } from '../Server';

export class Route {
  public static method(method: string, route: string, controller: string | { new() : Object }, action: string): {} {
    return { method, route, controller, action };
  }

  public static get(route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Get, route, controller, action);
  }

  public static post(route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Post, route, controller, action);
  }

  public static put(route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Put, route, controller, action);
  }

  public static patch(route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Patch, route, controller, action);
  }

  public static delete(route: string, controller: string | { new() : Object }, action: string): {} {
    return Route.method(RequestMethods.Delete, route, controller, action);
  }

  public static crud(route: string, controller: string | { new() : Object }): {} {
    const idRoute = `${route}/:id`;

    return [
      Route.post(route, controller, 'create'),
      Route.get(route, controller, 'find'),
      Route.get(idRoute, controller, 'findOne'),
      Route.put(idRoute, controller, 'overwrite'),
      Route.patch(idRoute, controller, 'update'),
      Route.delete(idRoute, controller, 'destroy'),
    ];
  }
}
