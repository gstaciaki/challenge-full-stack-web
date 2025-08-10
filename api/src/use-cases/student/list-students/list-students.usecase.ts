import { AbstractUseCase } from '@src/core/use-case';
import { Either, right } from '@src/util/either';
import { ZodSchema } from 'zod';
import { DefaultFailOutput } from '@src/types/errors';
import { autoParseFilters } from '@src/util/prisma/parse-filters';
import { ListStudentsInput, ListStudentsOutput, ListStudentsSchema } from '../dtos';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { Student } from '@src/entities/student.entity';

type Input = ListStudentsInput;
type FailOutput = DefaultFailOutput;
type SuccessOutput = ListStudentsOutput;

export class ListStudentsUseCase extends AbstractUseCase<Input, FailOutput, SuccessOutput> {
  constructor(private readonly studentRepo: IStudentRepository) {
    super();
  }

  protected validationRules(): ZodSchema<Input> {
    return ListStudentsSchema;
  }

  protected async execute(input: Input): Promise<Either<FailOutput, SuccessOutput>> {
    const { page = 1, limit = 10, ...rawFilters } = input;

    const [students, total] = await this.studentRepo.findWhere({
      page,
      limit,
      filters: autoParseFilters(rawFilters),
    });

    const domainStudents = students.map(student => new Student(student));

    return right({
      data: domainStudents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
}
