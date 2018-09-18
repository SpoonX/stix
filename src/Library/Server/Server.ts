import Koa, { Middleware } from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { ServerConfigInterface } from '../Config';
import { Application } from '../Application';
import routerMiddleware from '../../middleware/router';
import requestMiddleware from '../../middleware/request';
import dispatchMiddleware from '../../middleware/dispatch';

export const DEFAULT_PORT: number = 1991;

export class Server {
  private server: Koa;

  private config: ServerConfigInterface;

  private application: Application;

  constructor (application: Application, config: ServerConfigInterface = {}) {
    this.application = application;
    this.config = config;

    this.create();
  }

  private create(): this {
    this.server = new Koa();

    return this;
  }

  public use(...middlewares: Array<Middleware>): this {
    middlewares.forEach(middleware => this.server.use(middleware));

    return this;
  }

  public async initialize(): Promise<void> {
    const config = this.config;

    await config.bootstrap(this.server, this);

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

  public getServer(): Koa {
    return this.server;
  }

  public start(): this {
    this.server.listen(this.config.port || DEFAULT_PORT);

    return this;
  }
}
