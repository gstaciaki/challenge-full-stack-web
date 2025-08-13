import { makeUserController } from '@src/factories/user.factory';
import { RequestHandler, Router } from 'express';

const userRouter = Router();
const userController = makeUserController();

userRouter
  .post('/', userController.create.bind(userController) as RequestHandler)
  .get('/', userController.index.bind(userController) as RequestHandler)
  .get('/:id', userController.show.bind(userController) as RequestHandler)
  .put('/:id', userController.update.bind(userController) as RequestHandler)
  .delete('/:id', userController.delete.bind(userController) as RequestHandler);

export { userRouter };
