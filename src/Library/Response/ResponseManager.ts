import { ResponseConfigInterface } from '../Config';
import { InformationalResponse } from './InformationalResponse';
import { RedirectionResponse } from './RedirectionResponse';
import { ServerErrorResponse } from './ServerErrorResponse';
import { ClientErrorResponse } from './ClientErrorResponse';
import { SuccessfulResponse } from './SuccessfulResponse';

export class ResponseManager {
  private config: ResponseConfigInterface;

  constructor(config: ResponseConfigInterface) {
    this.config = config;
  }

  public informational(): typeof InformationalResponse {
    return this.config.responses.informational;
  }

  public redirection(): typeof RedirectionResponse {
    return this.config.responses.redirection;
  }

  public serverError(): typeof ServerErrorResponse {
    return this.config.responses.serverError;
  }

  public clientError(): typeof ClientErrorResponse {
    return this.config.responses.clientError;
  }

  public successful(): typeof SuccessfulResponse {
    return this.config.responses.successful;
  }
}
