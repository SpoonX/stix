import { Middleware } from 'koa';
import { AbstractMiddleware } from './AbstractMiddleware';

export type MiddlewareType = Middleware & { _name?: string; _fromClass?: typeof AbstractMiddleware; };
