import { AbstractUseCase } from '@src/core/use-case';
import { Either, right, wrong } from '@src/util/either';
import { ZodSchema } from 'zod';
import { DefaultFailOutput } from '@src/types/errors';
import { IUserRepository } from '@src/repositories/user/user.repository';
import { LoginUseCaseInput, LoginUseCaseOutput, LoginUseCaseSchema } from './dtos';
import { LoginFailedError } from '@src/errors/login.error';
import PasswordUtil from '@src/util/password';
import JWT from '@src/util/jwt';

type Input = LoginUseCaseInput;
type FailOutput = DefaultFailOutput;
type SuccessOutput = LoginUseCaseOutput;

export class LoginUseCase extends AbstractUseCase<Input, FailOutput, SuccessOutput> {
  constructor(private readonly userRepo: IUserRepository) {
    super();
  }

  protected validationRules(): ZodSchema<Input> {
    return LoginUseCaseSchema;
  }

  protected async execute(input: Input): Promise<Either<FailOutput, SuccessOutput>> {
    const user = await this.userRepo.findByEmail(input.email);

    if (!user) {
      return wrong(new LoginFailedError());
    }

    const passwordCheck = await PasswordUtil.comparePasswords(input.password, user.password);

    if (!passwordCheck) {
      return wrong(new LoginFailedError());
    }

    const accessToken = JWT.signToken(user.id, user.admin);

    return right({ accessToken });
  }
}
