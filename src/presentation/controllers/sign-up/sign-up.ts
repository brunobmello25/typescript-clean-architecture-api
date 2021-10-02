import { HttpRequest, HttpResponse, Controller, EmailValidator, CreateUser } from './sign-up-protocols';

import { MissingParamError, InvalidParamError } from '../../errors';

import { badRequest, created, serverError } from '../../helpers/http-helper';

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

      const user = await this.createUser.create({ name, email, password });

      return created(user);
    } catch (error) {
      return serverError();
    }
  }
}
