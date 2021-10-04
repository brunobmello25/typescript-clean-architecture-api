import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

const salt = 12;

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(spy).toHaveBeenCalledWith('any_value', salt);
  });

  test('should return a hash on success', async () => {
    const { sut } = makeSut();

    const hash = await sut.encrypt('any_value');

    expect(hash).toBe('any_hash');
  });
});

jest.mock('bcrypt', () => ({
  async hash(_value: string, _salt: number): Promise<string> {
    return 'any_hash';
  },
}));

interface SutTypes {
  sut: BcryptAdapter;
}

function makeSut(): SutTypes {
  const sut = new BcryptAdapter(salt);

  return {
    sut,
  };
}
