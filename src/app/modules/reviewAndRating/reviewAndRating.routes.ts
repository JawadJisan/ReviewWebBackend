import express from 'express';
import { ReviewAndRatingController } from './reviewAndRating.controller';

const router = express.Router();

// router.get(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   ReviewAndRatingController.getDataById
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   ReviewAndRatingController.deleteDataById
// );

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   validateRequest(validationSchema.update),
//   ReviewAndRatingController.updateDataById
// );

router.post(
  '/',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.CUSTOMER
  // ),
  // validateRequest(validationSchema.create),
  ReviewAndRatingController.AddReview
);

router.get('/', ReviewAndRatingController.getAllFromDB);

export const reviewAndRatingRoutes = router;
