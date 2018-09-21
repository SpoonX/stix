import { SuccessfulResponse, InformationalResponse, RedirectionResponse, ClientErrorResponse, ServerErrorResponse } from '../Library/Response';
import { ResponseConfigInterface } from '../Library';

/**
 * Response configuration.
 *
 * Register your custom responses with stix.
 * This allows stix and stix modules to use your response classes (instead of the builtin classes) to create responses.
 */
export const response: ResponseConfigInterface = {
  responses: {
    informational: InformationalResponse,
    successful: SuccessfulResponse,
    redirection: RedirectionResponse,
    clientError: ClientErrorResponse,
    serverError: ServerErrorResponse,
  },
};
