import express from 'express';

import { UserController } from './users.controller';

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

export const authRoutes = router;
