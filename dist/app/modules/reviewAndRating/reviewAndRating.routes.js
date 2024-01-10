"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reviewAndRating_controller_1 = require("./reviewAndRating.controller");
const router = express_1.default.Router();
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
router.post('/', 
// auth(
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.CUSTOMER
// ),
// validateRequest(validationSchema.create),
reviewAndRating_controller_1.ReviewAndRatingController.AddReview);
router.get('/', reviewAndRating_controller_1.ReviewAndRatingController.getAllFromDB);
exports.reviewAndRatingRoutes = router;
