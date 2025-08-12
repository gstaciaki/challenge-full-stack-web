import { PrismaClient } from '@prisma/client';
import { BaseRepository, IBaseRepository } from '@src/core/repository';
import { User } from '@src/entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  protected model: PrismaClient['user'];

  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
    this.model = prismaClient.user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({ where: { email } });
  }
}
