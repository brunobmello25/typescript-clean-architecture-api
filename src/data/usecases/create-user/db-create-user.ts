import { CreateUser, CreateUserDTO, Encrypter, User } from './db-create-user-protocols';

export class DbCreateUser implements CreateUser {
  constructor(private readonly encrypter: Encrypter) {}

  async create({ password }: CreateUserDTO): Promise<User> {
    await this.encrypter.encrypt(password);

    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'hashed_password',
    };
  }
}
