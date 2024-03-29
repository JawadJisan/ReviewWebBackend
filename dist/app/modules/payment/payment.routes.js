"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.patch('/initiate-payment/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), payment_controller_1.PaymentController.initiatePayment);
router.post('/success', payment_controller_1.PaymentController.paymentSuccess);
router.post('/fail', payment_controller_1.PaymentController.paymentFailed);
exports.paymentRoutes = router;
