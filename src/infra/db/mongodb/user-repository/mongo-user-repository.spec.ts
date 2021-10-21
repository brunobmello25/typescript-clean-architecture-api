import { MongoHelper } from '../helpers/mongo-helper';
import { MongoUserRepository } from './mongo-user-repository';

describe('Mongo User Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection('users').deleteMany({});
  });

  it('should return an user on success', async () => {
    const { sut } = makeSut();

    const user = await sut.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email@email.com');
    expect(user.password).toBe('any_password');
  });
});

function makeSut() {
  const sut = new MongoUserRepository();

  return { sut };
}
