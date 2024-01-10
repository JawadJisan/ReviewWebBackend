import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';

import { UserController } from './users.controller';
import { validationSchema } from './users.validation';

const router = express.Router();

router.post(
  '/signUp',
  // validateRequest(validationSchema.create),
  UserController.insertIntoDB
);

router.post(
  '/signIn',
  // validateRequest(validationSchema.userLogin),
  UserController.signinUser
);

router.post(
  '/refresh-token',
  validateRequest(validationSchema.refreshTokenZodSchema),
  UserController.refreshToken
);

export const authRoutes = router;
