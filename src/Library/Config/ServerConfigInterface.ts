import cors from 'koa__cors';
import { ServerOptions } from 'https';

export interface ServerConfigInterface {
  bootstrap?: Function;
  ssl?: ServerOptions;
  port?: number;
  cors?: {
    enabled?: boolean;
    options?: cors.Options;
  };
  [key: string]: any;
}
