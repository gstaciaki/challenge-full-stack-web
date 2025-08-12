import { BaseEntity, BaseProps } from '@src/core/entity';

export interface UserProps extends BaseProps {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export class User extends BaseEntity {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly cpf: string;

  constructor({ name, email, password, cpf, ...base }: UserProps) {
    super(base);
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
  }
}
