import { Student, PrismaClient } from '@prisma/client';
import { BaseRepository, IBaseRepository } from '../../core/repository';

export interface IStudentRepository extends IBaseRepository<Student> {
  findByRA(ra: string): Promise<Student | null>;
}

export class StudentRepository extends BaseRepository<Student> implements IStudentRepository {
  protected model: PrismaClient['student'];

  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
    this.model = prismaClient.student;
  }

  async findByRA(ra: string): Promise<Student | null> {
    return this.model.findUnique({ where: { ra } });
  }
}
