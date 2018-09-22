import { HttpStatusCodes } from '../Server';
import { Response } from './Response';

export class SuccessfulResponse extends Response {
  public static create (statusCode: HttpStatusCodes, data?: any, meta?: any): SuccessfulResponse {
    return new this({ statusCode, data, meta });
  }

  public static ok (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.Ok, data, meta);
  }

  public static created (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.Created, data, meta);
  }

  public static accepted (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.Accepted, data, meta);
  }

  public static nonAuthoritativeInformation (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.NonAuthoritativeInformation, data, meta);
  }

  public static noContent (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.NoContent, data, meta);
  }

  public static resetContent (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.ResetContent, data, meta);
  }

  public static partialContent (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.PartialContent, data, meta);
  }

  public static multiStatus (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.MultiStatus, data, meta);
  }

  public static alreadyReported (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.AlreadyReported, data, meta);
  }

  public static imUsed (data?: any, meta?: any): SuccessfulResponse {
    return this.create(HttpStatusCodes.ImUsed, data, meta);
  }

  apply () {
    this.setBody(this.data);
  }
}
