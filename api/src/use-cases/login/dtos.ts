import { z } from 'zod';

export const LoginUseCaseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginUseCaseInput = z.infer<typeof LoginUseCaseSchema>;
export type LoginUseCaseOutput = {
  accessToken: string;
};

export type LoginControllerOutput = LoginUseCaseOutput;
