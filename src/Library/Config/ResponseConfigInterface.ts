import { InformationalResponse, RedirectionResponse, ClientErrorResponse, ServerErrorResponse, SuccessfulResponse } from '../Response';

export interface ResponseConfigInterface {
  responses: {
    informational: typeof InformationalResponse;
    redirection: typeof RedirectionResponse;
    serverError: typeof ServerErrorResponse;
    clientError: typeof ClientErrorResponse;
    successful: typeof SuccessfulResponse;
  };
}
