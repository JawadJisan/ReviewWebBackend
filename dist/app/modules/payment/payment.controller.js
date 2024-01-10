"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = exports.paymentFailed = exports.paymentSuccess = exports.initiatePayment = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const payment_service_1 = require("./payment.service");
exports.initiatePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const result = yield payment_service_1.PaymentServices.initiatePayment(bookingId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Payment successfull',
        data: result,
    });
}));
exports.paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.query;
    if (!bookingId) {
        return res.redirect(`${config_1.default.forntend_url}/payment/fail`);
    }
    // @ts-ignore
    const result = yield payment_service_1.PaymentServices.paymentSuccess(bookingId);
    if (result) {
        res.redirect(`${config_1.default.forntend_url}/payment/success?bookingId=${bookingId}`);
    }
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   status: 'success',
    //   message: 'Payment Successful',
    //   data: result,
    // });
}));
exports.paymentFailed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.query;
    if (!bookingId) {
        return res.redirect(`${config_1.default.forntend_url}/payment/fail`);
    }
    // @ts-ignore
    const result = yield payment_service_1.PaymentServices.paymentFailed(bookingId);
    if (result) {
        res.redirect(`${config_1.default.forntend_url}/payment/fail?bookingId=${bookingId}`);
    }
}));
exports.PaymentController = {
    initiatePayment: exports.initiatePayment,
    paymentSuccess: exports.paymentSuccess,
    paymentFailed: exports.paymentFailed,
};
