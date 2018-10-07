import Koa, { Middleware } from 'koa';
import url from 'url';
import { ApplicationModes } from '../Application';
import { AbstractMiddleware, MiddlewareLookupType, MiddlewareType, RegisteredMiddlewareType } from '../Middleware';
import https, { ServerOptions } from 'https';
import { ServerConfigInterface } from '../Config';

export class ServerService {
  private readonly server: Koa;

  private readonly config: ServerConfigInterface;

  private middleware: Array<MiddlewareType|RegisteredMiddlewareType> = [];

  constructor (mode: ApplicationModes, config: ServerConfigInterface, middleware: Array<Middleware | AbstractMiddleware>) {
    this.config = config;

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

  public getURL () {
    const { port, ssl, hostname } = this.config;

    return url.format(`http${ssl ? 's' : ''}://${hostname}:${port == 80 ? '' : port}`);
  }

  public start (): this {
    if (this.config.ssl) {
      https.createServer(this.config.ssl, this.server.callback()).listen(this.config.port);
    } else {
      this.server.listen(this.config.port);
    }

    return this;
  }

  private asCallback (middleware: MiddlewareType): Middleware {
    return middleware instanceof AbstractMiddleware ? middleware.asCallback() : middleware;
  }
}
