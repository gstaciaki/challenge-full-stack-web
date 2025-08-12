import { CreateStudentUseCase } from './create-student.usecase';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { genStudent } from 'test/prefab/student';
import { AlreadyExistsError } from '@src/errors/generic.errors';
import { InputValidationError } from '@src/errors/input-validation.error';
import { CreateStudentInput } from '../dtos';

describe('CreateStudentUseCase', () => {
  let studentRepo: jest.Mocked<IStudentRepository>;
  let useCase: CreateStudentUseCase;

  beforeEach(() => {
    studentRepo = {
      create: jest.fn(),
      findByRAOrCPF: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findWhere: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new CreateStudentUseCase(studentRepo);
  });

  it('should return AlreadyExistsError if student with same RA or CPF exists', async () => {
    const input = genStudent();
    studentRepo.findByRAOrCPF.mockResolvedValue(input);

    const result = await useCase.run(input);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
    expect(studentRepo.create).not.toHaveBeenCalled();
  });

  it('should return InputValidationError if input is invalid', async () => {
    const invalidInput = {
      ra: '',
      cpf: '00000000000',
      name: '',
      email: 'invalidemail',
    };

    const result = await useCase.run(invalidInput);

    expect(result.isWrong()).toBe(true);
    expect(result.value).toBeInstanceOf(InputValidationError);
    expect(studentRepo.create).not.toHaveBeenCalled();
  });

  it('should create a new student if valid and does not exist', async () => {
    const input: CreateStudentInput = {
      name: 'Aluno',
      email: 'email@valid.com',
      ra: '12345671819',
      cpf: '25696597467',
    };

    studentRepo.findByRAOrCPF.mockResolvedValue(null);
    studentRepo.create.mockResolvedValue(genStudent({ ...input }));

    const result = await useCase.run(input);

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject(input);
    expect(studentRepo.findByRAOrCPF).toHaveBeenCalledWith(input.ra, input.cpf);
    expect(studentRepo.create).toHaveBeenCalled();
  });
});
