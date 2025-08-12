import { ShowStudentUseCase } from './show-student.usecase';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { genStudent } from 'test/prefab/student';
import { Student } from '@src/entities/student.entity';
import { NotFoundError } from '@src/errors/generic.errors';
import { InputValidationError } from '@src/errors/input-validation.error';

describe('ShowStudentUseCase', () => {
  let studentRepo: jest.Mocked<IStudentRepository>;
  let useCase: ShowStudentUseCase;

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

    useCase = new ShowStudentUseCase(studentRepo);
  });

  it('should return InputValidationError if id is not a valid UUID', async () => {
    const input = { id: 'invalid-id' };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(studentRepo.findById).not.toHaveBeenCalled();
  });

  it('should return NotFoundError if student is not found', async () => {
    const input = { id: '9e6cb5ce-b3b7-4203-b3e7-4d2d97c8e2a9' };

    studentRepo.findById.mockResolvedValue(null);

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
    expect(studentRepo.findById).toHaveBeenCalledWith(input.id);
  });

  it('should return a Student entity if student is found', async () => {
    const mockStudent = genStudent();
    const input = { id: mockStudent.id };

    studentRepo.findById.mockResolvedValue(mockStudent);

    const result = await useCase.run(input);

    if (result.isWrong()) fail('Expected result to be Right');
    expect(result.value).toBeInstanceOf(Student);
    expect(result.value.id).toBe(mockStudent.id);
    expect(studentRepo.findById).toHaveBeenCalledWith(input.id);
  });
});
