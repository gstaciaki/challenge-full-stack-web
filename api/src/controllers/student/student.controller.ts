import { Request, Response } from 'express';
import { AbstractController } from '@src/core/controller';
import { CreateStudentUseCase } from '@src/use-cases/student/create-student/create-student.usecase';
import { DefaultFailOutput } from '@src/types/errors';
import { StudentControllerOutput } from '@src/use-cases/student/dtos';

type FailOutput = DefaultFailOutput;
type SuccessOutput = StudentControllerOutput;

export class StudentController extends AbstractController<FailOutput, SuccessOutput> {
  constructor(private readonly createStudentUseCase: CreateStudentUseCase) {
    super();
  }

  async create(req: Request, res: Response) {
    const result = await this.createStudentUseCase.run(req.body);
    return result.isRight() ? this.created(req, res, result) : this.handleError(req, res, result);
  }
}
