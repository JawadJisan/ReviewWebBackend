"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import { validateRequest } from '../../middlewares/validateRequest';
// import { AvailableServiceController } from './availableService.controller';
// import { validationSchema } from './availableService.validation';
const listingProduct_controller_1 = require("./listingProduct.controller");
const router = express_1.default.Router();
// router.get(
//   '/remaining-service',
//   AvailableServiceController.getRemainingServicesFromDB
// );
router.get('/:id', listingProduct_controller_1.ListingProductController.getDataById);
// router.get('/:id/:date', AvailableServiceController.getAvailAbleService);
// router.get(
//   '/:categoryId/category',
//   AvailableServiceController.getServiceByCategory
// );
router.delete('/:id', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
listingProduct_controller_1.ListingProductController.deleteDataById);
router.patch('/:id', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
// validateRequest(validationSchema.update),
listingProduct_controller_1.ListingProductController.updateDataById);
router.patch('/:id/status', listingProduct_controller_1.ListingProductController.updateStatus);
router.post('/', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
// validateRequest(validationSchema.create),
listingProduct_controller_1.ListingProductController.insertIntoDB);
router.get('/', listingProduct_controller_1.ListingProductController.getAllFromDB);
exports.ListingProductRoutes = router;
