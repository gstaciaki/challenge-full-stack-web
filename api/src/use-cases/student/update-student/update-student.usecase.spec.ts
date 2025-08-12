import { UpdateStudentUseCase } from './update-student.usecase';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { genStudent } from 'test/prefab/student';
import { NotFoundError } from '@src/errors/generic.errors';
import { InputValidationError } from '@src/errors/input-validation.error';
import { Student } from '@src/entities/student.entity';

describe('UpdateStudentUseCase', () => {
  let studentRepo: jest.Mocked<IStudentRepository>;
  let useCase: UpdateStudentUseCase;

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

    useCase = new UpdateStudentUseCase(studentRepo);
  });

  it('should return InputValidationError if id is invalid', async () => {
    const input = {
      id: 'invalid-id',
      email: 'new@email.com',
      name: 'Updated Name',
    };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(studentRepo.findById).not.toHaveBeenCalled();
    expect(studentRepo.update).not.toHaveBeenCalled();
  });

  it('should return InputValidationError if email is invalid', async () => {
    const input = {
      id: 'a08f0dd7-bec7-4c0b-b065-aaa9f7683be6',
      email: 'invalid',
      name: 'Updated Name',
    };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(studentRepo.findById).not.toHaveBeenCalled();
    expect(studentRepo.update).not.toHaveBeenCalled();
  });

  it('should return InputValidationError if name is invalid', async () => {
    const input = {
      id: 'a08f0dd7-bec7-4c0b-b065-aaa9f7683be6',
      email: 'new@email.com',
      name: '',
    };

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(studentRepo.findById).not.toHaveBeenCalled();
    expect(studentRepo.update).not.toHaveBeenCalled();
  });

  it('should return NotFoundError if student does not exist', async () => {
    const input = {
      id: 'a08f0dd7-bec7-4c0b-b065-aaa9f7683be6',
      email: 'new@email.com',
      name: 'Updated Name',
    };

    studentRepo.findById.mockResolvedValue(null);

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
    expect(studentRepo.update).not.toHaveBeenCalled();
  });

  it('should update student and return updated Student entity', async () => {
    const existingStudent = genStudent();
    const input = {
      id: existingStudent.id,
      email: 'new@email.com',
      name: 'Updated Name',
    };

    studentRepo.findById.mockResolvedValue(existingStudent);
    studentRepo.update.mockResolvedValue({ ...existingStudent, ...input });

    const result = await useCase.run(input);

    if (result.isWrong()) fail('Expected result to be Right');

    expect(result.value).toBeInstanceOf(Student);
    expect(result.value.id).toBe(existingStudent.id);
    expect(result.value.email).toBe(input.email);
    expect(result.value.name).toBe(input.name);
    expect(studentRepo.update).toHaveBeenCalledWith(
      input.id,
      expect.objectContaining({
        email: input.email,
        name: input.name,
      }),
    );
  });
});
