import { HttpStatusCodes } from '../Server/HttpStatusCodes';
import { Response } from './Response';

export class RedirectionResponse extends Response {
  public static create(statusCode: HttpStatusCodes, location: string, alt?: string, meta?: any): RedirectionResponse {
    return new this({ statusCode, data: { location, alt }, meta });
  }

  public static multipleChoices(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.MultipleChoices, location, alt, meta);
  }

  public static movedPermanently(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.MovedPermanently, location, alt, meta);
  }

  public static found(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.Found, location, alt, meta);
  }

  public static seeOther(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.SeeOther, location, alt, meta);
  }

  public static notModified(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.NotModified, location, alt, meta);
  }

  public static useProxy(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.UseProxy, location, alt, meta);
  }

  public static switchProxy(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.SwitchProxy, location, alt, meta);
  }

  public static temporaryRedirect(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.TemporaryRedirect, location, alt, meta);
  }

  public static permanentRedirect(location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.create(HttpStatusCodes.PermanentRedirect, location, alt, meta);
  }

  apply() {
    this.ctx.redirect(this.data.location, this.data.alt);
  }
}
