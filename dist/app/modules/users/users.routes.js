"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.get('/:id', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
users_controller_1.UserController.getDataById);
router.get('/profile', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
users_controller_1.UserController.getProfileData);
router.patch('/:id', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
users_controller_1.UserController.updateDataById);
router.delete('/:id', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN),
users_controller_1.UserController.deleteDataById);
router.get('/', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
users_controller_1.UserController.getAllFromDB);
exports.userRoutes = router;
