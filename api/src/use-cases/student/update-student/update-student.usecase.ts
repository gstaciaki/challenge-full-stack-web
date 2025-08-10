import { Student } from '@src/entities/student.entity';
import { NotFoundError } from '@src/errors/generic.errors';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { AbstractUseCase } from '@src/core/use-case';
import { Either, right, wrong } from '@src/util/either';
import { UpdateStudentInput, UpdateStudentOutput, UpdateStudentSchema } from '../dtos';
import { DefaultFailOutput } from '@src/types/errors';
import { ZodSchema } from 'zod';

type Input = UpdateStudentInput;

type FailOutput = DefaultFailOutput;
type SuccessOutput = UpdateStudentOutput;

export class UpdateStudentUseCase extends AbstractUseCase<Input, FailOutput, SuccessOutput> {
  constructor(private readonly studentRepo: IStudentRepository) {
    super();
  }

  protected validationRules(): ZodSchema<Input> {
    return UpdateStudentSchema;
  }

  protected async execute(input: Input): Promise<Either<FailOutput, SuccessOutput>> {
    const student = await this.studentRepo.findById(input.id);

    if (!student) {
      return wrong(new NotFoundError('aluno', 'id', input.id));
    }

    const updatedStudent = new Student({
      ...student,
      ...input,
      updatedAt: new Date(),
    });

    await this.studentRepo.update(input.id, updatedStudent);

    return right(updatedStudent);
  }
}
