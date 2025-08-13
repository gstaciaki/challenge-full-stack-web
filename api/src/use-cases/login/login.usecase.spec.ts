import { IUserRepository } from '@src/repositories/user/user.repository';
import PasswordUtil from '@src/util/password';
import JWT from '@src/util/jwt';
import { LoginUseCase } from './login.usecase';
import { genUser } from 'test/prefab/user';
import { LoginFailedError } from '@src/errors/login.error';
import { InputValidationError } from '@src/errors/input-validation.error';

describe('LoginUseCase', () => {
  let userRepo: jest.Mocked<IUserRepository>;
  let useCase: LoginUseCase;

  beforeEach(() => {
    userRepo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findWhere: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
    };

    useCase = new LoginUseCase(userRepo);

    jest.spyOn(PasswordUtil, 'comparePasswords').mockResolvedValue(true);
    jest.spyOn(JWT, 'signToken').mockReturnValue('fakeAccessToken');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return LoginFailedError if user is not found', async () => {
    const input = { email: 'notfound@example.com', password: 'Password123!' };

    userRepo.findByEmail.mockResolvedValue(null);

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(LoginFailedError);
    expect(userRepo.findByEmail).toHaveBeenCalledWith(input.email);
  });

  it('should return LoginFailedError if password does not match', async () => {
    const user = genUser({ password: 'hashedPassword' });
    const input = { email: user.email, password: 'wrongPassword' };

    userRepo.findByEmail.mockResolvedValue(user);
    (PasswordUtil.comparePasswords as jest.Mock).mockResolvedValueOnce(false);

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(LoginFailedError);
    expect(PasswordUtil.comparePasswords).toHaveBeenCalledWith(input.password, user.password);
  });

  it('should return InputValidationError if email is invalid', async () => {
    const input = { email: 'invalid', password: 'Password123!' };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(userRepo.findByEmail).not.toHaveBeenCalled();
  });

  it('should return InputValidationError if password is empty', async () => {
    const input = { email: 'valid@example.com', password: '' };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(userRepo.findByEmail).not.toHaveBeenCalled();
  });

  it('should return access token if credentials are valid', async () => {
    const user = genUser({ password: 'hashedPassword', admin: true });
    const input = { email: user.email, password: 'Password123!' };

    userRepo.findByEmail.mockResolvedValue(user);

    const result = await useCase.run(input);

    expect(result.value).toEqual({ accessToken: 'fakeAccessToken' });
    expect(JWT.signToken).toHaveBeenCalledWith(user.id, user.admin);
  });
});
