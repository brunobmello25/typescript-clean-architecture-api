import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';

import { MissingParamError } from '../errors/MissingParamError';
import { InvalidParamError } from '../errors/InvalidParamError';

import { badRequest, serverError } from '../helpers/httpHelper';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isEmailValid) return badRequest(new InvalidParamError('email'));

      return {
        body: null,
        statusCode: 200,
      };
    } catch (error) {
      return serverError();
    }
  }
}
