import { Student } from '@src/entities/student.entity';
import { NotFoundError } from '@src/errors/generic.errors';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { AbstractUseCase } from '@src/core/use-case';
import { Either, right, wrong } from '@src/util/either';
import { DeleteStudentInput, DeleteStudentOutput, DeleteStudentSchema } from '../dtos';
import { ZodSchema } from 'zod';
import { DefaultFailOutput } from '@src/types/errors';

type Input = DeleteStudentInput;
type FailOutput = DefaultFailOutput;
type SuccessOutput = DeleteStudentOutput;

export class DeleteStudentUseCase extends AbstractUseCase<Input, FailOutput, SuccessOutput> {
  constructor(private readonly studentRepo: IStudentRepository) {
    super();
  }

  protected validationRules(): ZodSchema<Input> {
    return DeleteStudentSchema;
  }

  protected async execute(input: Input): Promise<Either<FailOutput, SuccessOutput>> {
    const student = await this.studentRepo.findById(input.id);

    if (!student) {
      return wrong(new NotFoundError('aluno', 'id', input.id));
    }

    const domainStudent = new Student(student);

    await this.studentRepo.delete(domainStudent.id);

    return right(domainStudent);
  }
}
