import { ResponseService } from './ResponseService';
import { SuccessfulResponse } from './SuccessfulResponse';
import { ClientErrorResponse } from './ClientErrorResponse';
import { ServerErrorResponse } from './ServerErrorResponse';
import { RedirectionResponse } from './RedirectionResponse';
import { inject } from '../ServiceManager/decorators';

export class AbstractResponseHelper {
  @inject(ResponseService)
  protected responseService: ResponseService;

  protected getResponseService (): ResponseService {
    return this.responseService;
  }

  protected okResponse (data?: any, meta?: any): SuccessfulResponse {
    return this.responseService.successful().ok(data, meta);
  }

  protected createdResponse (data?: any, meta?: any): SuccessfulResponse {
    return this.responseService.successful().created(data, meta);
  }

  protected notFoundResponse (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.responseService.clientError().notFound(message, data, meta);
  }

  protected requestTimeoutResponse (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.responseService.clientError().requestTimeout(message, data, meta);
  }

  protected forbiddenResponse (message?: string, data?: any, meta?: any): ClientErrorResponse {
    return this.responseService.clientError().forbidden(message, data, meta);
  }

  protected badRequestResponse (message?: string, data?: any, meta?: Object): ClientErrorResponse {
    return this.responseService.clientError().badRequest(message, data, meta);
  }

  protected unauthorizedResponse (message?: string, data?: any, meta?: Object): ClientErrorResponse {
    return this.responseService.clientError().unauthorized(message, data, meta);
  }

  protected internalServerErrorResponse (message?: string, data?: any, meta?: Object): ServerErrorResponse {
    return this.responseService.serverError().internalServerError(message, data, meta);
  }

  protected permanentRedirectResponse (location: string, alt?: string, meta?: any): RedirectionResponse {
    return this.responseService.redirection().permanentRedirect(location, alt, meta);
  }
}
