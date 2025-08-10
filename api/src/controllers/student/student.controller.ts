import { Request, Response } from 'express';
import { AbstractController } from '@src/core/controller';
import { CreateStudentUseCase } from '@src/use-cases/student/create-student/create-student.usecase';
import { DefaultFailOutput } from '@src/types/errors';
import { StudentControllerOutput } from '@src/use-cases/student/dtos';
import { ListStudentsUseCase } from '@src/use-cases/student/list-students/list-students.usecase';
import { ShowStudentUseCase } from '@src/use-cases/student/show-student/show-student.usecase';
import { UpdateStudentUseCase } from '@src/use-cases/student/update-student/update-student.usecase';
import { DeleteStudentUseCase } from '@src/use-cases/student/delete-student/delete-student.usecase';

type FailOutput = DefaultFailOutput;
type SuccessOutput = StudentControllerOutput;

export class StudentController extends AbstractController<FailOutput, SuccessOutput> {
  constructor(
    private readonly createStudentUseCase: CreateStudentUseCase,
    private readonly listStudentsUseCase: ListStudentsUseCase,
    private readonly showStudentUseCase: ShowStudentUseCase,
    private readonly updateStudentUseCase: UpdateStudentUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
  ) {
    super();
  }

  async index(req: Request, res: Response) {
    const result = await this.listStudentsUseCase.run(req.query);
    return result.isRight() ? this.ok(req, res, result) : this.handleError(req, res, result);
  }

  async show(req: Request, res: Response) {
    const result = await this.showStudentUseCase.run({ id: req.params.id });
    return result.isRight() ? this.ok(req, res, result) : this.handleError(req, res, result);
  }

  async create(req: Request, res: Response) {
    const result = await this.createStudentUseCase.run(req.body);
    return result.isRight() ? this.created(req, res, result) : this.handleError(req, res, result);
  }

  async update(req: Request, res: Response) {
    const result = await this.updateStudentUseCase.run({ id: req.params.id, ...req.body });
    return result.isRight() ? this.ok(req, res, result) : this.handleError(req, res, result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.deleteStudentUseCase.run({ id: req.params.id });
    return result.isRight() ? this.ok(req, res, result) : this.handleError(req, res, result);
  }
}
