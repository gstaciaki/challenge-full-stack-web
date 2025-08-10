import { Student } from '@src/entities/student.entity';
import { CPF } from '@src/entities/value-objects/cpf';
import { z } from 'zod';

export type OutputStudent = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ra: string;
  createdAt: Date;
  updatedAt: Date;
};

export const CreateStudentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  ra: z.string().min(1, 'RA é obrigatório'),
  cpf: z.string().refine(CPF.isValid, 'CPF inválido'),
});

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;
export type CreateStudentOutput = Student;

export type StudentControllerOutput = CreateStudentOutput;
