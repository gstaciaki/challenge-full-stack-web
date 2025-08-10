import { AbstractUseCase } from '@src/core/use-case';
import { AlreadyExistsError } from '@src/errors/generic.errors';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { DefaultFailOutput } from '@src/types/errors';
import { Either, right, wrong } from '@src/util/either';
import { ZodSchema } from 'zod';
import { CreateStudentInput, CreateStudentOutput, CreateStudentSchema } from '../dtos';
import { Student } from '@src/entities/student.entity';

type Input = CreateStudentInput;
type FailOutput = DefaultFailOutput;
type SuccessOutput = CreateStudentOutput;

export class CreateStudentUseCase extends AbstractUseCase<Input, FailOutput, SuccessOutput> {
  constructor(private readonly studentRepo: IStudentRepository) {
    super();
  }

  protected validationRules(): ZodSchema<Input> {
    return CreateStudentSchema;
  }

  protected async execute(input: Input): Promise<Either<FailOutput, SuccessOutput>> {
    const existingStudent = await this.studentRepo.findByRAOrCPF(input.ra, input.cpf);
    if (existingStudent) {
      return wrong(new AlreadyExistsError('aluno', 'RA ou CPF'));
    }

    const student = new Student({ ...input });
    await this.studentRepo.create(student);
    return right(student);
  }
}
