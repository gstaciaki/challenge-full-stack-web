import { Student } from '@src/entities/student.entity';
import { CPF } from '@src/entities/value-objects/cpf';
import { Paginated } from '@src/types/paginator';
import { BasePaginatorSchema } from '@src/util/zod/paginator';
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

export const ListStudentsSchema = BasePaginatorSchema.extend({
  name: z.string().optional(),
  email: z.string().optional(),
  ra: z.string().optional(),
  cpf: z.string().refine(CPF.isValid, 'CPF inválido').optional(),
});

export type ListStudentsInput = z.infer<typeof ListStudentsSchema>;
export type ListStudentsOutput = Paginated<Student>;

export const ShowStudentSchema = z.object({
  id: z.string().uuid('ID inválido'),
});

export type ShowStudentInput = z.infer<typeof ShowStudentSchema>;
export type ShowStudentOutput = Student;

export const UpdateStudentSchema = z.object({
  id: z.string().uuid('ID inválido'),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;
export type UpdateStudentOutput = Student;

export const DeleteStudentSchema = z.object({
  id: z.string().uuid('ID inválido'),
});

export type DeleteStudentInput = z.infer<typeof DeleteStudentSchema>;
export type DeleteStudentOutput = Student;

export type StudentControllerOutput =
  | CreateStudentOutput
  | ListStudentsOutput
  | ShowStudentOutput
  | UpdateStudentOutput
  | DeleteStudentOutput;
