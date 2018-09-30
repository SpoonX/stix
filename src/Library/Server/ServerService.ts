import Koa, { Middleware } from 'koa';
import { ApplicationModes } from '../Application';
import { AbstractMiddleware, MiddlewareLookupType, MiddlewareType, RegisteredMiddlewareType } from '../Middleware';
import { InvalidArgumentError } from '../Error';

export class ServerService {
  private readonly server: Koa;

  private readonly port: number;

  private middleware: Array<MiddlewareType|RegisteredMiddlewareType> = [];

  constructor (mode: ApplicationModes, port: number, middleware: Array<Middleware | AbstractMiddleware>) {
    this.port = port;

    if (mode === ApplicationModes.Server) {
      this.server     = new Koa();
      this.middleware = this.server.middleware;
    }

    this.use(...middleware);
  }

  public use (...middlewares: Array<Middleware | AbstractMiddleware>): this {
    middlewares.forEach(middleware => {
      this.middleware.push(this.asCallback(middleware));
    });

    return this;
  }

  public useBefore (middleware: MiddlewareLookupType, ...middlewares: Array<MiddlewareType>): this {
    return this.updateMiddleware(this.indexOfMiddleware(middleware), 0, ...middlewares);
  }

  public useAfter (middleware: MiddlewareLookupType, ...middlewares: Array<MiddlewareType>): this {
    return this.updateMiddleware(this.indexOfMiddleware(middleware) + 1, 0, ...middlewares);
  }

  public replace (middleware: MiddlewareLookupType, ...middlewares: Array<MiddlewareType>): this {
    return this.updateMiddleware(this.indexOfMiddleware(middleware), 1, ...middlewares);
  }

  public updateMiddleware (at: number, remove: number, ...middlewares: Array<MiddlewareType>): this {
    this.middleware.splice(at === -1 ? 0 : at, remove, ...middlewares.map(middleware => this.asCallback(middleware)));

    return this;
  }

  public indexOfMiddleware (middleware: MiddlewareLookupType) {
    if (!this.server) {
      return -1;
    }

    return this.middleware.findIndex((suspect: RegisteredMiddlewareType) => {
      if (typeof middleware === 'string') {
        if (suspect._name) {
          return suspect._name === middleware;
        }

        return suspect.name === middleware;
      }

      if (suspect._fromClass) {
        return middleware === suspect._fromClass;
      }

      return suspect === middleware;
    });
  }

  public getServer (): Koa {
    return this.server;
  }

  public start (): this {
    this.server.listen(this.port);

    return this;
  }

  private asCallback (middleware: MiddlewareType): Middleware {
    return middleware instanceof AbstractMiddleware ? middleware.asCallback() : middleware;
  }
}
