import bodyParser from 'koa-bodyparser';
import { ServiceManagerInterface } from '../ServiceManager';
import { ServerService } from './ServerService';
import { Application } from '../Application';
import { DispatchMiddleware, RequestMiddleware, RouterMiddleware } from '../Middleware';
import { Config, ServerConfigInterface } from '../Config';
import cors from '@koa/cors';

export const ServerServiceFactory = (sm: ServiceManagerInterface) => {
  const config     = sm.get(Config).of<ServerConfigInterface>('server');
  const middleware = [
    sm.get(RequestMiddleware),
    bodyParser(),
    sm.get(RouterMiddleware),
    sm.get(DispatchMiddleware),
  ];

  if (config.cors.enabled) {
    middleware.unshift(cors(config.cors.options));
  }

  return new ServerService(sm.get(Application).getMode(), config, middleware);
};
