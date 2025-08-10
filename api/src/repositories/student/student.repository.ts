import { Student, PrismaClient } from '@prisma/client';
import { BaseRepository, IBaseRepository } from '../../core/repository';

export interface IStudentRepository extends IBaseRepository<Student> {
  findByRAOrCPF(ra: string, cpf: string): Promise<Student | null>;
}

export class StudentRepository extends BaseRepository<Student> implements IStudentRepository {
  protected model: PrismaClient['student'];

  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
    this.model = prismaClient.student;
  }

  async findByRAOrCPF(ra: string, cpf: string): Promise<Student | null> {
    return this.model.findFirst({
      where: {
        OR: [{ ra }, { cpf }],
      },
    });
  }
}
