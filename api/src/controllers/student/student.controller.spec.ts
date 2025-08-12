import { StudentController } from '@src/controllers/student/student.controller';
import { Request, Response } from 'express';
import { CreateStudentUseCase } from '@src/use-cases/student/create-student/create-student.usecase';
import { ListStudentsUseCase } from '@src/use-cases/student/list-students/list-students.usecase';
import { ShowStudentUseCase } from '@src/use-cases/student/show-student/show-student.usecase';
import { UpdateStudentUseCase } from '@src/use-cases/student/update-student/update-student.usecase';
import { DeleteStudentUseCase } from '@src/use-cases/student/delete-student/delete-student.usecase';
import { right, wrong } from '@src/util/either';
import { InputValidationError } from '@src/errors/input-validation.error';
import { ZodError } from 'zod';
import { AlreadyExistsError, NotFoundError } from '@src/errors/generic.errors';

describe('StudentController', () => {
  let controller: StudentController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  const mockStudent = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
  };

  const createStudentUseCase = {
    run: jest.fn().mockResolvedValue(right(mockStudent)),
  } as unknown as CreateStudentUseCase;
  const listStudentsUseCase = { run: jest.fn() } as unknown as ListStudentsUseCase;
  const showStudentUseCase = { run: jest.fn() } as unknown as ShowStudentUseCase;
  const updateStudentUseCase = { run: jest.fn() } as unknown as UpdateStudentUseCase;
  const deleteStudentUseCase = { run: jest.fn() } as unknown as DeleteStudentUseCase;

  beforeEach(() => {
    controller = new StudentController(
      createStudentUseCase,
      listStudentsUseCase,
      showStudentUseCase,
      updateStudentUseCase,
      deleteStudentUseCase,
    );

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: jsonMock });

    mockReq = {
      body: mockStudent,
    };

    mockRes = {
      status: statusMock,
      send: jsonMock,
    };
  });

  it('should return 201 if create student runs successfully', async () => {
    await controller.create(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(201);
  });

  it('should return 200 if show student runs successfully', async () => {
    (showStudentUseCase.run as jest.Mock).mockResolvedValueOnce(right(mockStudent));
    const req = { params: { id: '123' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn(),
    } as unknown as Response;
    await controller.show(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if list students runs successfully', async () => {
    (listStudentsUseCase.run as jest.Mock).mockResolvedValue(right([mockStudent]));
    const req = {} as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn(),
    } as unknown as Response;
    await controller.index(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if update student runs successfully', async () => {
    (updateStudentUseCase.run as jest.Mock).mockResolvedValue(right(mockStudent));
    const req = { params: { id: '123' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn(),
    } as unknown as Response;
    await controller.update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 200 if delete student runs successfully', async () => {
    (deleteStudentUseCase.run as jest.Mock).mockResolvedValue(right(mockStudent));
    const req = { params: { id: '123' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      send: jest.fn(),
    } as unknown as Response;
    await controller.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it.each([
    ['index', (c: StudentController, r: Request, s: Response) => c.index(r, s)],
    ['show', (c: StudentController, r: Request, s: Response) => c.show(r, s)],
    ['create', (c: StudentController, r: Request, s: Response) => c.create(r, s)],
    ['update', (c: StudentController, r: Request, s: Response) => c.update(r, s)],
    ['delete', (c: StudentController, r: Request, s: Response) => c.delete(r, s)],
  ])('should return 400 if %s use case fails with InputValidationError', async (_, method) => {
    const error = new InputValidationError(new ZodError([]));

    (listStudentsUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
    (showStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
    (createStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
    (updateStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
    (deleteStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));

    const req = { params: { id: '123' }, body: {} } as unknown as Request;
    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ send: sendMock });
    const res = { status: statusMock, send: sendMock } as unknown as Response;

    await method(controller, req, res);

    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it.each([
    ['show', (c: StudentController, r: Request, s: Response) => c.show(r, s)],
    ['update', (c: StudentController, r: Request, s: Response) => c.update(r, s)],
    ['delete', (c: StudentController, r: Request, s: Response) => c.delete(r, s)],
  ])('should return 404 if %s use case fails with NotFoundError', async (_, method) => {
    const error = new NotFoundError('student', 'prop', 'value');

    (showStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
    (updateStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
    (deleteStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));

    const req = { params: { id: '123' }, body: {} } as unknown as Request;
    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ send: sendMock });
    const res = { status: statusMock, send: sendMock } as unknown as Response;

    await method(controller, req, res);

    expect(statusMock).toHaveBeenCalledWith(404);
  });

  it.each([['create', (c: StudentController, r: Request, s: Response) => c.create(r, s)]])(
    'should return 409 if %s use case fails with AlreadyExistsError',
    async (_, method) => {
      const error = new AlreadyExistsError('student', 'prop');

      (createStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));
      (updateStudentUseCase.run as jest.Mock).mockResolvedValue(wrong(error));

      const req = { params: { id: '123' }, body: {} } as unknown as Request;
      const sendMock = jest.fn();
      const statusMock = jest.fn().mockReturnValue({ send: sendMock });
      const res = { status: statusMock, send: sendMock } as unknown as Response;

      await method(controller, req, res);

      expect(statusMock).toHaveBeenCalledWith(409);
    },
  );
});
