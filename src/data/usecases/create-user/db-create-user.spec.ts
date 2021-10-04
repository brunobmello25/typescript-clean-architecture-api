import { CreateUserRepository, CreateUserDTO, Encrypter, User } from './db-create-user-protocols';
import { DbCreateUser } from './db-create-user';

describe('DBCreateUser UseCase', () => {
  test('should call Encrypter with proper password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    await sut.create({ name: 'valid_name', email: 'valid_email@email.com', password: 'valid_password' });

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.create({ name: 'valid_name', email: 'valid_email@email.com', password: 'valid_password' });

    await expect(promise).rejects.toThrow();
  });

  test('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createUserRepositoryStub, 'create');

    await sut.create({ name: 'valid_name', email: 'valid_email@email.com', password: 'valid_password' });

    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'hashed_password',
    });
  });
});

interface SutTypes {
  sut: DbCreateUser;
  encrypterStub: Encrypter;
  createUserRepositoryStub: CreateUserRepository;
}

function makeSut(): SutTypes {
  const createUserRepositoryStub = makeCreateUserRepositoryStub();
  const encrypterStub = makeEncrypterStub();

  const sut = new DbCreateUser(encrypterStub, createUserRepositoryStub);

  return {
    sut,
    encrypterStub,
    createUserRepositoryStub,
  };
}

function makeEncrypterStub(): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return 'hashed_password';
    }
  }

  return new EncrypterStub();
}

function makeCreateUserRepositoryStub(): CreateUserRepository {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(_userData: CreateUserDTO): Promise<User> {
      const fakeUser = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'hashed_password',
      };

      return fakeUser;
    }
  }

  const createUserRepositoryStub = new CreateUserRepositoryStub();

  return createUserRepositoryStub;
}
