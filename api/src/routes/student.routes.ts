import { makeStudentController } from '@src/factories/student.factory';
import { RequestHandler, Router } from 'express';

const studentRouter = Router();
const studentController = makeStudentController();

studentRouter.post('/student', studentController.create.bind(studentController) as RequestHandler);

export { studentRouter };
