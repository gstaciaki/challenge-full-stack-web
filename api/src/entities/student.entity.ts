import { BaseEntity, BaseProps } from '../core/entity';

export interface StudentProps extends BaseProps {
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

export class Student extends BaseEntity {
  readonly name: string;
  readonly email: string;
  readonly ra: string;
  readonly cpf: string;

  constructor({ name, email, ra, cpf, ...base }: StudentProps) {
    super(base);
    this.name = name;
    this.email = email;
    this.ra = ra;
    this.cpf = cpf;
  }
}
