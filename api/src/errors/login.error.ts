import { BaseBusinessError } from './base-business.error';

export class LoginFailedError extends BaseBusinessError {
  constructor() {
    super(`E-mail ou senha incorreta`);
  }
}
