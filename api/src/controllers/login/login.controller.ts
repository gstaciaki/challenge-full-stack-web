import { Request, Response } from 'express';
import { AbstractController } from '@src/core/controller';
import { DefaultFailOutput } from '@src/types/errors';
import { LoginUseCase } from '@src/use-cases/login/login.usecase';
import { LoginControllerOutput } from '@src/use-cases/login/dtos';

type FailOutput = DefaultFailOutput;
type SuccessOutput = LoginControllerOutput;

export class LoginController extends AbstractController<FailOutput, SuccessOutput> {
  constructor(private readonly loginUseCase: LoginUseCase) {
    super();
  }

  async login(req: Request, res: Response) {
    const result = await this.loginUseCase.run(req.body);
    return result.isRight() ? this.ok(req, res, result) : this.handleError(req, res, result);
  }
}
