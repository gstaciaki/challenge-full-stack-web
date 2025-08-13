import { LoginController } from '@src/controllers/login/login.controller';
import { Request, Response } from 'express';
import { LoginUseCase } from '@src/use-cases/login/login.usecase';
import { right, wrong } from '@src/util/either';
import { InputValidationError } from '@src/errors/input-validation.error';
import { ZodError } from 'zod';
import { LoginFailedError } from '@src/errors/login.error';

describe('LoginController', () => {
  let controller: LoginController;
  let loginUseCase: LoginUseCase;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  const mockLoginResponse = { accessToken: 'fake-token' };

  beforeEach(() => {
    loginUseCase = { run: jest.fn() } as unknown as LoginUseCase;
    controller = new LoginController(loginUseCase);

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ send: jsonMock });

    mockReq = {
      body: { email: 'test@example.com', password: 'password' },
    };

    mockRes = {
      status: statusMock,
      send: jsonMock,
    };
  });

  it('should return 200 if login is successful', async () => {
    (loginUseCase.run as jest.Mock).mockResolvedValue(right(mockLoginResponse));

    await controller.login(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockLoginResponse);
  });

  it('should return 400 if login fails with InputValidationError', async () => {
    const error = new InputValidationError(new ZodError([]));
    (loginUseCase.run as jest.Mock).mockResolvedValue(wrong(error));

    await controller.login(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should return 401 if login fails with LoginFailedError', async () => {
    const error = new LoginFailedError();
    (loginUseCase.run as jest.Mock).mockResolvedValue(wrong(error));

    await controller.login(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
  });
});
