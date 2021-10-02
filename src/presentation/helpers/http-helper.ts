import { HttpResponse } from '../protocols/http';

import { ServerError } from '../errors/server-error';

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error,
  };
}

export function serverError(): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
}

export function created(record: unknown): HttpResponse {
  return {
    statusCode: 201,
    body: record,
  };
}
