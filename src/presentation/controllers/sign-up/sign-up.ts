import { HttpRequest, HttpResponse, Controller, EmailValidator, CreateUser } from './sign-up-protocols';

import { MissingParamError, InvalidParamError } from '../../errors';

import { badRequest, serverError } from '../../helpers/http-helper';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      await this.createUser.create({ name, email, password });

      return {
        statusCode: 201,
        body: {
          message: 'User created successfully',
        },
      };
    } catch (error) {
      return serverError();
    }
  }
}
