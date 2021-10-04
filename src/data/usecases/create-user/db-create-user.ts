import { CreateUser, CreateUserDTO, CreateUserRepository, Encrypter, User } from './db-create-user-protocols';

export class DbCreateUser implements CreateUser {
  constructor(private readonly encrypter: Encrypter, private readonly createUserRepository: CreateUserRepository) {}

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const encryptedPassword = await this.encrypter.encrypt(password);

    const createUser = await this.createUserRepository.create({ name, email, password: encryptedPassword });

    return {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      password: createUser.password,
    };
  }
}
