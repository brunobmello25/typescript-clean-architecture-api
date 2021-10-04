import { Encrypter } from '../../protocols/encrypter';
import { DbCreateUser } from './db-create-user';

describe('DBCreateUser UseCase', () => {
  test('should call Encrypter with proper password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    await sut.create({ name: 'valid_name', email: 'valid_email@email.com', password: 'valid_password' });

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});

interface SutTypes {
  sut: DbCreateUser;
  encrypterStub: Encrypter;
}

function makeSut(): SutTypes {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return 'hashed_password';
    }
  }

  const encrypterStub = new EncrypterStub();

  const sut = new DbCreateUser(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
}
