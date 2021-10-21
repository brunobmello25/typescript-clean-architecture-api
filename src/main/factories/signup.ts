import { SignUpController } from '../../presentation/controllers/sign-up/sign-up';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbCreateUser } from '../../data/usecases/create-user/db-create-user';
import { BcryptAdapter } from '../../infra/encrypter/bcrypt-adapter';
import { MongoUserRepository } from '../../infra/db/mongodb/user-repository/mongo-user-repository';

export function makeSignUpController(): SignUpController {
  const emailValidator = new EmailValidatorAdapter();

  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);

  const mongoUserRepository = new MongoUserRepository();

  const dbCreateUser = new DbCreateUser(bcryptAdapter, mongoUserRepository);

  return new SignUpController(emailValidator, dbCreateUser);
}
