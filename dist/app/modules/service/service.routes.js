"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router.get('/:id', service_controller_1.ServiceController.getDataById);
router.get('/:categoryId/category', service_controller_1.ServiceController.getServiceByCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceController.deleteDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(service_validation_1.validationSchema.update), service_controller_1.ServiceController.updateDataById);
router.post('/', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
(0, validateRequest_1.validateRequest)(service_validation_1.validationSchema.create), service_controller_1.ServiceController.insertIntoDB);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceController.getAllFromDB);
exports.serviceRoutes = router;
