import { HttpStatusCodes } from '../Server';
import { Response } from './Response';

export class ClientErrorResponse extends Response {
  public static create (statusCode: HttpStatusCodes, message?: string, data?: any, meta?: any): ClientErrorResponse {
    return new this({ statusCode, message, data, meta });
  }

  public static badRequest (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.BadRequest, message, data, meta);
  }

  public static unauthorized (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.Unauthorized, message, data, meta);
  }

  public static paymentRequired (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.PaymentRequired, message, data, meta);
  }

  public static forbidden (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.Forbidden, message, data, meta);
  }

  public static notFound (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.NotFound, message, data, meta);
  }

  public static methodNotAllowed (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.MethodNotAllowed, message, data, meta);
  }

  public static notAcceptable (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.NotAcceptable, message, data, meta);
  }

  public static proxyAuthenticationRequired (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.ProxyAuthenticationRequired, message, data, meta);
  }

  public static requestTimeout (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.RequestTimeout, message, data, meta);
  }

  public static conflict (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.Conflict, message, data, meta);
  }

  public static gone (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.Gone, message, data, meta);
  }

  public static lengthRequired (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.LengthRequired, message, data, meta);
  }

  public static preconditionFailed (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.PreconditionFailed, message, data, meta);
  }

  public static payloadTooLarge (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.PayloadTooLarge, message, data, meta);
  }

  public static uriTooLong (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.UriTooLong, message, data, meta);
  }

  public static unsupportedMediaType (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.UnsupportedMediaType, message, data, meta);
  }

  public static rangeNotSatisfiable (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.RangeNotSatisfiable, message, data, meta);
  }

  public static expectationFailed (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.ExpectationFailed, message, data, meta);
  }

  public static iAmATeapot (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.IAmATeapot, message, data, meta);
  }

  public static misdirectedRequest (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.MisdirectedRequest, message, data, meta);
  }

  public static unprocessableEntity (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.UnprocessableEntity, message, data, meta);
  }

  public static locked (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.Locked, message, data, meta);
  }

  public static failedDependency (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.FailedDependency, message, data, meta);
  }

  public static upgradeRequired (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.UpgradeRequired, message, data, meta);
  }

  public static preconditionRequired (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.PreconditionRequired, message, data, meta);
  }

  public static tooManyRequests (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.TooManyRequests, message, data, meta);
  }

  public static requestHeaderFieldsTooLarge (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.RequestHeaderFieldsTooLarge, message, data, meta);
  }

  public static unavailableForLegalReasons (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.create(HttpStatusCodes.UnavailableForLegalReasons, message, data, meta);
  }

  apply () {
    this.setBody({ message: this.message, data: this.data });
  }
}
