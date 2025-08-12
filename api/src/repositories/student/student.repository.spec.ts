import { StudentRepository } from './student.repository';
import { prismaTest } from 'jest.setup';
import { setupDatabaseLifecycle } from 'test/helpers/base-test';
import { genStudent } from 'test/prefab/student';

setupDatabaseLifecycle();

describe('StudentRepository', () => {
  const repository = new StudentRepository(prismaTest);

  it('should create a student', async () => {
    const data = genStudent();
    const created = await repository.create(data);
    expect(created).toMatchObject(data);
  });

  it('should find a student by id', async () => {
    const data = genStudent();
    await repository.create(data);

    const found = await repository.findById(data.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(data.id);
  });

  it('should update a student', async () => {
    const data = genStudent();
    await repository.create(data);

    const updated = await repository.update(data.id, { name: 'Updated Student Name' });
    expect(updated.name).toBe('Updated Student Name');
  });

  it('should delete a student', async () => {
    const data = genStudent();
    await repository.create(data);

    await repository.delete(data.id);
    const found = await repository.findById(data.id);
    expect(found).toBeNull();
  });

  it('should return all students', async () => {
    await repository.create(genStudent());
    await repository.create(genStudent());

    const students = await repository.findAll();
    expect(students.length).toBeGreaterThanOrEqual(2);
  });

  it('should find a student by RA or CPF', async () => {
    const student = genStudent();
    await repository.create(student);

    const foundByRA = await repository.findByRAOrCPF(student.ra, 'non-existent-cpf');
    expect(foundByRA).not.toBeNull();
    expect(foundByRA?.ra).toBe(student.ra);

    const foundByCPF = await repository.findByRAOrCPF('non-existent-ra', student.cpf);
    expect(foundByCPF).not.toBeNull();
    expect(foundByCPF?.cpf).toBe(student.cpf);

    const notFound = await repository.findByRAOrCPF('non-existent-ra', 'non-existent-cpf');
    expect(notFound).toBeNull();
  });
});
