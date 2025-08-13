import { makeStudentController } from '@src/factories/student.factory';
import { authMiddleware } from '@src/middlewares/auth';
import { RequestHandler, Router } from 'express';

const studentRouter = Router();
const studentController = makeStudentController();

studentRouter.use(authMiddleware);

studentRouter
  .post('/student', studentController.create.bind(studentController) as RequestHandler)
  .get('/student', studentController.index.bind(studentController) as RequestHandler)
  .get('/student/:id', studentController.show.bind(studentController) as RequestHandler)
  .put('/student/:id', studentController.update.bind(studentController) as RequestHandler)
  .delete('/student/:id', studentController.delete.bind(studentController) as RequestHandler);

export { studentRouter };
