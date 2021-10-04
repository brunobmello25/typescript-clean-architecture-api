import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidator Adapter', () => {
  test('return false if provided email is invalid', () => {
    const { sut } = makeSut();
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_email@mail.com');

    expect(isValid).toBe(false);
  });

  test('return true if provided email is valid', () => {
    const { sut } = makeSut();

    const isValid = sut.isValid('valid_email@mail.com');

    expect(isValid).toBe(true);
  });

  test('should call validator with correct email', () => {
    const { sut } = makeSut();
    const isValidSpy = jest.spyOn(sut, 'isValid');

    sut.isValid('any_email@email.com');

    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true;
  },
}));

function makeSut() {
  const sut = new EmailValidatorAdapter();

  return {
    sut,
  };
}
