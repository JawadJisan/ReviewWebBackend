import express from 'express';
import { reviewCategoryController } from './serviceCategory.controller';

const router = express.Router();

router.get('/:id', reviewCategoryController.getDataById);

router.delete('/:id', reviewCategoryController.deleteDataById);

router.patch(
  '/:id',
  // validateRequest(validationSchema.update),
  reviewCategoryController.updateDataById
);
router.post(
  '/',
  // validateRequest(validationSchema.create),
  reviewCategoryController.insertIntoDB
);

router.get('/', reviewCategoryController.getAllFromDB);

export const reviewCategoryRoute = router;
