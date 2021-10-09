import { CreateUserRepository } from '../../../../data/protocols/create-user-repository';
import { User } from '../../../../domain/models/user';
import { CreateUserDTO } from '../../../../domain/usecases/create-user';
import { MongoHelper } from '../helpers/mongo-helper';

export class MongoUserRepository implements CreateUserRepository {
  async create(userData: CreateUserDTO): Promise<User> {
    const userCollection = MongoHelper.getCollection('users');

    const result = await userCollection.insertOne(userData);

    return { id: result.insertedId.id.toString(), ...userData };
  }
}
