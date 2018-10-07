import send, { SendOptions } from 'koa-send';
import path from 'path';
import { HttpStatusCodes } from '../Server';
import { ContextInterface } from '../Interface';
import { ResponseStrategies } from './ResponseStrategies';

export class Response {
  protected ctx: ContextInterface;

  protected headers: { [header: string]: string | Array<string> } = {};

  protected strategy: string = ResponseStrategies.Json;

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

  public async patchContext (ctx: ContextInterface) {
    this.ctx = ctx;

    // Basic stuff
    this.applyStatusCode(this.statusCode).applyHeaders();

    if (this.strategy === ResponseStrategies.File) {
      await this.sendFile();
    } else if (this.strategy === ResponseStrategies.Html) {
      ctx.type = 'html';

      this.applyBody(this.data);
    } else {
      // Default to json.
      this.applyBody(this.format());
    }

    // Allow hooks.
    if (typeof this.apply === 'function') {
      await this.apply();
    }
  }

  protected async sendFile () {
    const { location, options = {} } = this.meta;
    const { dir, base } = path.parse(location);

    if (options.root) {
      return await send(this.ctx, location, options);
    }

    await send(this.ctx, base, Object.assign({ root: dir }, options));
  }

  public applyStatusCode (statusCode: HttpStatusCodes): this {
    this.ctx.status = statusCode;

    return this;
  }

  public setStatusCode (statusCode: HttpStatusCodes): this {
    this.statusCode = statusCode;

    return this;
  }

  public getStatusCode (): HttpStatusCodes {
    return this.statusCode;
  }

  protected applyBody (body: any): this {
    if (body) {
      this.ctx.body = body;
    }

    return this;
  }

  public setHeaders (headers: { [header: string]: string | Array<string> }): this {
    this.headers = headers;

    return this;
  }

  public addHeaders (headers: { [header: string]: string | Array<string> }): this{
    Reflect.ownKeys(headers).forEach((header: string) => this.setHeader(header, headers[header]));

    return this;
  }

  public setHeader (header: string, value: string | Array<string>): this {
    this.headers[header] = value;

    return this;
  }

  public appendHeader (header: string, value: string | Array<string>) {
    this.headers[header] = [].concat(this.headers[header], value);
  }

  public removeHeader (header: string): this {
    delete this.headers[header];

    return this;
  }

  public applyHeaders (): this {
    Reflect.ownKeys(this.headers).forEach((header: string) => this.ctx.set(header, this.headers[header]));

    return this;
  }

  public file (location: string, options?: SendOptions): this {
    this.strategy = ResponseStrategies.File;
    this.meta = { location, options };

    return this;
  }

  public json (data: any): this {
    this.strategy = ResponseStrategies.Json;
    this.data = data;

    return this;
  }

  public html (data: any): this {
    this.strategy = ResponseStrategies.Html;
    this.data = data;

    return this;
  }

  protected apply (): void {
    return;
  }

  protected format (): any {
    return;
  }
}

export interface ResponseArgumentsInterface {
  statusCode: HttpStatusCodes;
  message?: string;
  data?: any;
  meta?: any;
}
