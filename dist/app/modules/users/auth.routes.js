"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post('/signUp', 
// validateRequest(validationSchema.create),
users_controller_1.UserController.insertIntoDB);
router.post('/signIn', 
// validateRequest(validationSchema.userLogin),
users_controller_1.UserController.signinUser);
exports.authRoutes = router;
