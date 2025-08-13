import { loginRouter } from './login.routes';
import { studentRouter } from './student.routes';
import { userRouter } from './user.routes';

export const routes = [
  { path: 'student', router: studentRouter },
  { path: 'user', router: userRouter },
  { path: 'login', router: loginRouter },
];
