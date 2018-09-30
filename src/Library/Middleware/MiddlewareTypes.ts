import { Middleware } from 'koa';
import { AbstractMiddleware } from './AbstractMiddleware';

export type RegisteredMiddlewareType = Middleware & { _name?: string; _fromClass?: typeof AbstractMiddleware; };

export type MiddlewareLookupType = string | typeof AbstractMiddleware | Middleware;

export type MiddlewareType = AbstractMiddleware | Middleware;
