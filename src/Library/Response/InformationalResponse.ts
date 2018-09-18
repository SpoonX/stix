import { HttpStatusCodes } from '../Server/HttpStatusCodes';
import { Response } from './Response';

export class InformationalResponse extends Response {
  public static create(statusCode: HttpStatusCodes, meta?: any): InformationalResponse {
    return new this({ statusCode, meta });
  }

  public static continue(meta?: any): InformationalResponse {
    return this.create(HttpStatusCodes.Continue, meta);
  }

  public static switchingProtocols(meta?: any): InformationalResponse {
    return this.create(HttpStatusCodes.SwitchingProtocols, meta);
  }

  public static processing(meta?: any): InformationalResponse {
    return this.create(HttpStatusCodes.Processing, meta);
  }

  apply() {
    // Noop. LGTM!
  }
}
