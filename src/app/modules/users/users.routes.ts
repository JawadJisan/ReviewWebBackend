import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getDataById
);
router.get(
  '/profile',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getProfileData
);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateDataById
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteDataById
);
router.get(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllFromDB
);

export const userRoutes = router;
