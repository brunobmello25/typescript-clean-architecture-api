import { CreateUser, CreateUserDTO, CreateUserRepository, Encrypter, User } from './db-create-user-protocols';

export class DbCreateUser implements CreateUser {
  constructor(private readonly encrypter: Encrypter, private readonly createUserRepository: CreateUserRepository) {}

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const encryptedPassword = await this.encrypter.encrypt(password);

    await this.createUserRepository.create({ name, email, password: encryptedPassword });

    return {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'hashed_password',
    };
  }
}
