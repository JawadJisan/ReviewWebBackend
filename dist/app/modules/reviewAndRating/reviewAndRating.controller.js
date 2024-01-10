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
exports.ReviewAndRatingController = exports.getAllFromDB = exports.AddReview = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const reviewAndRating_service_1 = require("./reviewAndRating.service");
// export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
//   const data = req.body;
//   const token = req.headers.authorization;
//   const verifiedUser = jwtHelpers.verifyToken(
//     token as string,
//     config.jwt.secret as string
//   );
//   const result = await ReviewAndRatingServices.insertIntoDB(verifiedUser, data);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     status: 'success',
//     message: 'Review created successfully',
//     data: result,
//   });
// });
exports.AddReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const token = req.headers.authorization;
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = yield reviewAndRating_service_1.ReviewAndRatingServices.AddReview(verifiedUser, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Yup! Review created successfully',
        data: result,
    });
}));
exports.getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRating_service_1.ReviewAndRatingServices.getAllFromDB();
    if (result.data.length === 0) {
        return next(new ApiError_1.default('No Review found!', http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Yup! Review retrived successfully',
        data: result.data,
    });
}));
exports.ReviewAndRatingController = {
    getAllFromDB: exports.getAllFromDB,
    AddReview: exports.AddReview,
};
