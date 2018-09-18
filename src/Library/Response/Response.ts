import { HttpStatusCodes } from '../Server';
import { ContextInterface } from '../Interface';

export abstract class Response {
  public abstract apply(): void;

  protected ctx: ContextInterface;

  protected headers: { [header: string]: string | Array<string> } = {};

  protected statusCode: HttpStatusCodes;

  protected meta: any;

  protected data: any;

  protected message: string;

  protected constructor ({ message, data, meta, statusCode }: ResponseArgumentsInterface) {
    this.data       = data;
    this.meta       = meta;
    this.message    = message;
    this.statusCode = statusCode;
  }

  public patchContext(ctx: ContextInterface) {
    this.ctx = ctx;

    this.setStatusCode(this.statusCode).applyHeaders().apply();
  }

  public setStatusCode(statusCode: HttpStatusCodes): this {
    this.ctx.status = statusCode;

    return this;
  }

  public getStatusCode(): HttpStatusCodes {
    return this.statusCode;
  }

  public setBody(body: any): this {
    this.ctx.body = body;

    return this;
  }

  public setHeaders(headers: { [header: string]: string | Array<string> }): this {
    this.headers = headers;

    return this;
  }

  public addHeaders(headers: { [header: string]: string | Array<string> }): this{
    Reflect.ownKeys(headers).forEach((header: string) => this.setHeader(header, headers[header]));

    return this;
  }

  public setHeader(header: string, value: string | Array<string>): this {
    this.headers[header] = value;

    return this;
  }

  public appendHeader(header: string, value: string | Array<string>) {
    this.headers[header] = [].concat(this.headers[header], value);
  }

  public removeHeader(header: string): this {
    delete this.headers[header];

    return this;
  }

  public applyHeaders(): this {
    Reflect.ownKeys(this.headers).forEach((header: string) => this.ctx.set(header, this.headers[header]));

    return this;
  }
}

export interface ResponseArgumentsInterface {
  statusCode: HttpStatusCodes;
  message?: string;
  data?: any;
  meta?: any;
}
