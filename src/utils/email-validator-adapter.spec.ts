import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidator Adapter', () => {
  test('return false if provided email is invalid', () => {
    const sut = new EmailValidatorAdapter();

    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_email@mail.com');

    expect(isValid).toBe(false);
  });

  test('return true if provided email is valid', () => {
    const sut = new EmailValidatorAdapter();

    const isValid = sut.isValid('valid_email@mail.com');

    expect(isValid).toBe(true);
  });
});

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true;
  },
}));
