import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter(12);
    const spy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(spy).toHaveBeenCalledWith('any_value', 12);
  });
});
