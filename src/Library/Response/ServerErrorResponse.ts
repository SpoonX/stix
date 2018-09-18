import { HttpStatusCodes } from '../Server/HttpStatusCodes';
import { Response } from './Response';

export class ServerErrorResponse extends Response {
  public static create(statusCode: HttpStatusCodes, message?: string, data?: any, meta?: Object): ServerErrorResponse {
    return new this({ statusCode, message, data, meta });
  }

  public static internalServerError(message?: string, data?: any, meta?: Object): ServerErrorResponse {
    return this.create(HttpStatusCodes.InternalServerError, message, data, meta);
  }

  public static notImplemented(message?: string, data?: any, meta?: Object): ServerErrorResponse {
    return this.create(HttpStatusCodes.NotImplemented, message, data, meta);
  }

  public static badGateway(message?: string, data?: any, meta?: Object): ServerErrorResponse {
    return this.create(HttpStatusCodes.BadGateway, message, data, meta);
  }

  public static serviceUnavailable(message?: string, data?: any, meta?: Object): ServerErrorResponse {
    return this.create(HttpStatusCodes.ServiceUnavailable, message, data, meta);
  }

  public static gatewayTimeout(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.GatewayTimeout, message, data, meta);
  }

  public static httpVersionNotSupported(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.HttpVersionNotSupported, message, data, meta);
  }

  public static variantAlsoNegotiates(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.VariantAlsoNegotiates, message, data, meta);
  }

  public static insufficientStorage(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.InsufficientStorage, message, data, meta);
  }

  public static loopDetected(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.LoopDetected, message, data, meta);
  }

  public static notExtended(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.NotExtended, message, data, meta);
  }

  public static networkAuthenticationRequired(message?: string, data?: any, meta?: any): ServerErrorResponse {
    return this.create(HttpStatusCodes.NetworkAuthenticationRequired, message, data, meta);
  }

  apply () {
    const body: { message?: string, data?: any } = {};

    if (this.message) {
      body.message = this.message;
    }

    if (this.data) {
      body.data = this.data;
    }

    this.setBody(body);
  }
}
