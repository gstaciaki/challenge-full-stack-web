import { StudentController } from '@src/controllers/student/student.controller';
import { prisma } from '@src/database';
import { StudentRepository } from '@src/repositories/student/student.repository';
import { CreateStudentUseCase } from '@src/use-cases/student/create-student/create-student.usecase';

export function makeStudentController(): StudentController {
  const studentRepository = new StudentRepository(prisma);
  const createUserUseCase = new CreateStudentUseCase(studentRepository);

  return new StudentController(createUserUseCase);
}
