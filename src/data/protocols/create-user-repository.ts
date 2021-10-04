import { CreateUserDTO } from '../../domain/usecases/create-user';
import { User } from '../../domain/models/user';

export interface CreateUserRepository {
  create(_userData: CreateUserDTO): Promise<User>;
}
