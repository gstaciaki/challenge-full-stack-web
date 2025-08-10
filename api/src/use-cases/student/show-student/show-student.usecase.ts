import { NotFoundError } from '@src/errors/generic.errors';
import { AbstractUseCase } from '@src/core/use-case';
import { Either, right, wrong } from '@src/util/either';
import { ZodSchema } from 'zod';
import { DefaultFailOutput } from '@src/types/errors';
import { ShowStudentInput, ShowStudentOutput, ShowStudentSchema } from '../dtos';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { Student } from '@src/entities/student.entity';

type Input = ShowStudentInput;
type FailOutput = DefaultFailOutput;
type SuccessOutput = ShowStudentOutput;

export class ShowStudentUseCase extends AbstractUseCase<Input, FailOutput, SuccessOutput> {
  constructor(private readonly studentRepo: IStudentRepository) {
    super();
  }

  protected validationRules(): ZodSchema<Input> {
    return ShowStudentSchema;
  }

  protected async execute(input: Input): Promise<Either<FailOutput, SuccessOutput>> {
    const student = await this.studentRepo.findById(input.id);

    if (!student) {
      return wrong(new NotFoundError('aluno', 'id', input.id));
    }

    const domainStudent = new Student(student);
    return right(domainStudent);
  }
}
