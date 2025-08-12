import { Student } from '@src/entities/student.entity';
import { cpf } from './cpf';
import { faker } from '@faker-js/faker/.';

type StudentInput = {
  id?: string;
  name?: string;
  email?: string;
  studentCpf?: string;
  ra?: string;
};

export const genStudent = ({
  id = faker.string.uuid(),
  name = faker.person.fullName(),
  email = faker.internet.email(),
  studentCpf = cpf(),
  ra = faker.seed().toString(),
}: StudentInput = {}): Student =>
  new Student({
    id,
    name,
    email,
    ra,
    cpf: studentCpf,
  });
