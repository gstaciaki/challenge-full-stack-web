import { LoginController } from '@src/controllers/login/login.controller';
import { prisma } from '@src/database';
import { UserRepository } from '@src/repositories/user/user.repository';
import { LoginUseCase } from '@src/use-cases/login/login.usecase';

export function makeLoginController(): LoginController {
  const userRepository = new UserRepository(prisma);
  const loginUseCase = new LoginUseCase(userRepository);

  return new LoginController(loginUseCase);
}
