import cors from 'koa__cors';

export interface ServerConfigInterface {
  bootstrap?: Function;
  port?: number;
  cors?: {
    enabled?: boolean;
    options?: cors.Options;
  };
  [key: string]: any;
}
