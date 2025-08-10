import { StudentController } from '@src/controllers/student/student.controller';
import { prisma } from '@src/database';
import { StudentRepository } from '@src/repositories/student/student.repository';
import { CreateStudentUseCase } from '@src/use-cases/student/create-student/create-student.usecase';
import { DeleteStudentUseCase } from '@src/use-cases/student/delete-student/delete-student.usecase';
import { ListStudentsUseCase } from '@src/use-cases/student/list-students/list-students.usecase';
import { ShowStudentUseCase } from '@src/use-cases/student/show-student/show-student.usecase';
import { UpdateStudentUseCase } from '@src/use-cases/student/update-student/update-student.usecase';

export function makeStudentController(): StudentController {
  const studentRepository = new StudentRepository(prisma);
  const createUserUseCase = new CreateStudentUseCase(studentRepository);
  const listStudentsUseCase = new ListStudentsUseCase(studentRepository);
  const showStudentUseCase = new ShowStudentUseCase(studentRepository);
  const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
  const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);

  return new StudentController(
    createUserUseCase,
    listStudentsUseCase,
    showStudentUseCase,
    updateStudentUseCase,
    deleteStudentUseCase,
  );
}
