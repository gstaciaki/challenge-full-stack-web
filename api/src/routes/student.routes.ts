import { makeStudentController } from '@src/factories/student.factory';
import { authMiddleware } from '@src/middlewares/auth';
import { RequestHandler, Router } from 'express';

const studentRouter = Router();
const studentController = makeStudentController();

studentRouter.use(authMiddleware);

studentRouter
  .post('/', studentController.create.bind(studentController) as RequestHandler)
  .get('/', studentController.index.bind(studentController) as RequestHandler)
  .get('/:id', studentController.show.bind(studentController) as RequestHandler)
  .put('/:id', studentController.update.bind(studentController) as RequestHandler)
  .delete('/:id', studentController.delete.bind(studentController) as RequestHandler);

export { studentRouter };
