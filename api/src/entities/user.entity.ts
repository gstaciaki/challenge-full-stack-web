import { BaseEntity, BaseProps } from '@src/core/entity';

export interface UserProps extends BaseProps {
  name: string;
  email: string;
  password: string;
  cpf: string;
  admin?: boolean;
}

export class User extends BaseEntity {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly cpf: string;
  readonly admin: boolean;

  constructor({ name, email, password, cpf, admin = false, ...base }: UserProps) {
    super(base);
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.admin = admin;
  }
}
