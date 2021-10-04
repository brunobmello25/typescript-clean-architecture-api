import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter(12);
    const spy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(spy).toHaveBeenCalledWith('any_value', 12);
  });

  test('should return a hash on success', async () => {
    const sut = new BcryptAdapter(12);

    const hash = await sut.encrypt('any_value');

    expect(hash).toBe('any_hash');
  });
});

jest.mock('bcrypt', () => ({
  async hash(_value: string, _salt: number): Promise<string> {
    return 'any_hash';
  },
}));
