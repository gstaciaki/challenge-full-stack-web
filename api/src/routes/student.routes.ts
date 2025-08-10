import { makeStudentController } from '@src/factories/student.factory';
import { RequestHandler, Router } from 'express';

const studentRouter = Router();
const studentController = makeStudentController();

studentRouter
  .post('/student', studentController.create.bind(studentController) as RequestHandler)
  .get('/student', studentController.index.bind(studentController) as RequestHandler)
  .get('/student/:id', studentController.show.bind(studentController) as RequestHandler)
  .put('/student/:id', studentController.update.bind(studentController) as RequestHandler)
  .delete('/student/:id', studentController.delete.bind(studentController) as RequestHandler);

export { studentRouter };
