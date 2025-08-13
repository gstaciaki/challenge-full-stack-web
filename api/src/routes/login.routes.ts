import { makeLoginController } from '@src/factories/login.factory';
import { RequestHandler, Router } from 'express';

const loginRouter = Router();
const loginController = makeLoginController();

loginRouter.post('/', loginController.login.bind(loginController) as RequestHandler);

export { loginRouter };
