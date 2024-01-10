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
exports.PaymentServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const generateTransactionId_1 = require("../../../shared/generateTransactionId");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const SSLCommerzPayment = require('sslcommerz-lts');
const initiatePayment = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const bookings = yield prisma_1.default.booking.findUnique({
            where: {
                id: bookingId,
            },
            include: {
                service: true,
                user: true,
                payment: true,
            },
        });
        if (!bookings) {
            throw new ApiError_1.default('Invalid booking service', http_status_1.default.NOT_FOUND);
        }
        const transactionId = (0, generateTransactionId_1.generateTransactionId)();
        const sslData = {
            total_amount: (_a = bookings === null || bookings === void 0 ? void 0 : bookings.service) === null || _a === void 0 ? void 0 : _a.price,
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `${config_1.default.backend_url}/payment/success?bookingId=${bookingId}`,
            fail_url: `${config_1.default.backend_url}/payment/fail?bookingId=${bookingId}`,
            cancel_url: `${config_1.default.backend_url}/payment/cancel`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: (_b = bookings === null || bookings === void 0 ? void 0 : bookings.service) === null || _b === void 0 ? void 0 : _b.serviceName,
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: (_c = bookings === null || bookings === void 0 ? void 0 : bookings.user) === null || _c === void 0 ? void 0 : _c.fullName,
            cus_email: (_d = bookings === null || bookings === void 0 ? void 0 : bookings.user) === null || _d === void 0 ? void 0 : _d.email,
            cus_add1: (_e = bookings === null || bookings === void 0 ? void 0 : bookings.user) === null || _e === void 0 ? void 0 : _e.address,
            cus_country: 'Bangladesh',
            cus_phone: (_f = bookings === null || bookings === void 0 ? void 0 : bookings.user) === null || _f === void 0 ? void 0 : _f.contactNumber,
            ship_name: (_g = bookings === null || bookings === void 0 ? void 0 : bookings.user) === null || _g === void 0 ? void 0 : _g.fullName,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const payment = yield prisma_1.default.payment.update({
            where: {
                bookingId: bookingId,
            },
            data: {
                transactionId: sslData.tran_id,
            },
        });
        console.log(payment);
        const sslcz = new SSLCommerzPayment(config_1.default.ssl_store_id, config_1.default.ssl_store_password, config_1.default.ssl_is_live);
        // Wait for the init method to complete and get the response
        const apiResponse = yield sslcz.init(sslData);
        // Redirect the user to the payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        return GatewayPageURL;
    }
    catch (error) {
        // Handle errors here
        console.error(error);
    }
});
const paymentSuccess = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the available service exists
    const bookings = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!bookings) {
        throw new ApiError_1.default('There is no booking', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.confirmed) {
        throw new ApiError_1.default('This booking already completed', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.rejected) {
        throw new ApiError_1.default('This booking already canceled', http_status_1.default.NOT_FOUND);
    }
    const finishBooking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield transactionClient.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: client_1.BookingStatus.confirmed,
            },
        });
        const payment = yield transactionClient.payment.update({
            where: {
                bookingId: bookingId,
            },
            data: {
                paymentStatus: client_1.PaymentStatus.paid,
            },
        });
        return {
            booking: book,
            payment: payment,
        };
    }));
    return finishBooking;
});
const paymentFailed = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the available service exists
    const bookings = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!bookings) {
        throw new ApiError_1.default('There is no booking', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.confirmed) {
        throw new ApiError_1.default('This booking already completed', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.rejected) {
        throw new ApiError_1.default('This booking already canceled', http_status_1.default.NOT_FOUND);
    }
    return bookings;
});
exports.PaymentServices = {
    initiatePayment,
    paymentSuccess,
    paymentFailed,
};
