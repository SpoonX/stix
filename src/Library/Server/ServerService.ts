import Koa, { Middleware } from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { ServerConfigInterface } from '../Config';
import { Application } from '../Application';
import { dispatchMiddleware, requestMiddleware, routerMiddleware } from '../../middleware';

export class ServerService {
  private readonly server: Koa;

  private readonly application: Application;

  private config: ServerConfigInterface;

  constructor (application: Application) {
    this.application = application;

    this.server = new Koa();
  }

  public use (...middlewares: Array<Middleware>): this {
    middlewares.forEach(middleware => this.server.use(middleware));

    return this;
  }

  public useBefore (middleware: string | Middleware, ...middlewares: Array<Middleware>): this {
    return this.updateMiddleware(this.indexOfMiddleware(middleware), 0, ...middlewares);
  }

  public useAfter (middleware: string | Middleware, ...middlewares: Array<Middleware>): this {
    return this.updateMiddleware(this.indexOfMiddleware(middleware) + 1, 0, ...middlewares);
  }

  public replace (middleware: string | Middleware, ...middlewares: Array<Middleware>): this {
    return this.updateMiddleware(this.indexOfMiddleware(middleware), 1, ...middlewares);
  }

  public updateMiddleware (at: number, remove: number, ...middlewares: Array<Middleware>): this {
    const middleware  = this.server.middleware;

    if (at === -1) {
      throw new Error();
    }

    middleware.splice(at, remove, ...middlewares);

    return this;
  }

  public indexOfMiddleware (middleware: string | Middleware) {
    if (typeof middleware === 'function') {
      return this.server.middleware.indexOf(middleware);
    }

    return this.server.middleware.findIndex(suspect => suspect.name === middleware);
  }

  public async initialize (config: ServerConfigInterface): Promise<void> {
    this.config = config;

    if (config.cors.enabled) {
      this.use(cors(config.cors.options));
    }

    this.use(
      requestMiddleware(),
      bodyParser(),
      routerMiddleware(this.application),
      dispatchMiddleware(this.application),
    );
  }

  public getServer (): Koa {
    return this.server;
  }

  public start (): this {
    this.server.listen(this.config.port);

    return this;
  }
}
