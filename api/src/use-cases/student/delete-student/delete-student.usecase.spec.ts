import { DeleteStudentUseCase } from './delete-student.usecase';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { NotFoundError } from '@src/errors/generic.errors';
import { InputValidationError } from '@src/errors/input-validation.error';
import { genStudent } from 'test/prefab/student';
import { Student } from '@src/entities/student.entity';

describe('DeleteStudentUseCase', () => {
  let studentRepo: jest.Mocked<IStudentRepository>;
  let useCase: DeleteStudentUseCase;

  beforeEach(() => {
    studentRepo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findWhere: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      findByRAOrCPF: jest.fn(),
    };

    useCase = new DeleteStudentUseCase(studentRepo);
  });

  it('should return InputValidationError if id is not a valid UUID', async () => {
    const input = { id: 'invalid-id' };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(studentRepo.findById).not.toHaveBeenCalled();
    expect(studentRepo.delete).not.toHaveBeenCalled();
  });

  it('should return NotFoundError if student is not found', async () => {
    const input = { id: '9e6cb5ce-b3b7-4203-b3e7-4d2d97c8e2a9' };

    studentRepo.findById.mockResolvedValue(null);

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
    expect(studentRepo.delete).not.toHaveBeenCalled();
  });

  it('should delete student and return Student entity', async () => {
    const existingStudent = genStudent();
    const input = { id: existingStudent.id };

    studentRepo.findById.mockResolvedValue(existingStudent);
    studentRepo.delete.mockResolvedValue(undefined);

    const result = await useCase.run(input);

    if (result.isWrong()) fail('Expected result to be Right');
    expect(result.value).toBeInstanceOf(Student);
    expect(result.value.id).toBe(existingStudent.id);
    expect(studentRepo.findById).toHaveBeenCalledWith(input.id);
    expect(studentRepo.delete).toHaveBeenCalledWith(input.id);
  });
});
