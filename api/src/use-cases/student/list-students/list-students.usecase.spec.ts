import { ListStudentsUseCase } from './list-students.usecase';
import { IStudentRepository } from '@src/repositories/student/student.repository';
import { genStudent } from 'test/prefab/student';

describe('ListStudentsUseCase', () => {
  let studentRepo: jest.Mocked<IStudentRepository>;
  let useCase: ListStudentsUseCase;

  beforeEach(() => {
    studentRepo = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findWhere: jest.fn(),
      findById: jest.fn(),
      findByRAOrCPF: jest.fn(),
    } as any;

    useCase = new ListStudentsUseCase(studentRepo);
  });

  it('should return empty data array and pagination info when no students found', async () => {
    studentRepo.findWhere.mockResolvedValue([[], 0]);

    const result = await useCase.run({ page: 1, limit: 10 });

    if (result.isWrong()) fail('Expected result to be Right');

    expect(result.value).toEqual({
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    });

    expect(studentRepo.findWhere).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      filters: {},
    });
  });

  it('should return paginated students and pagination info', async () => {
    const studentsRaw = [genStudent(), genStudent()];
    const totalCount = 20;

    studentRepo.findWhere.mockResolvedValue([studentsRaw, totalCount]);

    const result = await useCase.run({ page: 2, limit: 2 });

    if (result.isWrong()) fail('Expected result to be Right');

    expect(Array.isArray(result.value.data)).toBe(true);
    expect(result.value.data).toHaveLength(studentsRaw.length);

    result.value.data.forEach(studentOutput => {
      expect(studentOutput).toHaveProperty('id');
      expect(studentOutput).toHaveProperty('name');
      expect(studentOutput).toHaveProperty('email');
      expect(studentOutput).toHaveProperty('cpf');
      expect(studentOutput).toHaveProperty('createdAt');
      expect(studentOutput).toHaveProperty('updatedAt');
    });

    expect(result.value.pagination).toEqual({
      page: 2,
      limit: 2,
      total: totalCount,
      totalPages: Math.ceil(totalCount / 2),
    });

    expect(studentRepo.findWhere).toHaveBeenCalledWith({
      page: 2,
      limit: 2,
      filters: {},
    });
  });
});
