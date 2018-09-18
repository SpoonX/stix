import { Middleware } from 'koa';
import cors from 'koa__cors';
import { Application } from '../Application';

export interface ServerConfigInterface {
  boostrap?: Function;
  port?: number;
  middlewares?: Array<(application: Application) => Middleware>;
  cors?: {
    enabled?: boolean;
    options?: cors.Options;
  };
  [key: string]: any;
}
