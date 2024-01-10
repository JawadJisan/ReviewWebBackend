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
exports.ListingProductController = exports.getAllFromDB = exports.insertIntoDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationFields_1 = require("../../../constants/paginationFields");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const listingProduct_constant_1 = require("./listingProduct.constant");
const listingProduct_service_1 = require("./listingProduct.service");
// import { AvailableServiceServices } from './availableService.service';
exports.insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield listingProduct_service_1.ListingProductServices.insertIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Yup! Your Listing was sent to moderator for Aprove',
        data: result,
    });
}));
exports.getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, listingProduct_constant_1.listingProductRelationalFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const result = yield listingProduct_service_1.ListingProductServices.getAllFromDB(filters, paginationOptions);
    if (result.data.length === 0) {
        return next(new ApiError_1.default('No Listing Product Found', http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Listing Product retrived successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// export const getRemainingServicesFromDB: RequestHandler = catchAsync(
//   async (req, res, next) => {
//     const filters = pick(req.query, availableServiceFilterableFields);
//     const paginationOptions = pick(req.query, paginationFields);
//     const date = req.query.date as string;
//     const result = await AvailableServiceServices.getAllRemainingServices(
//       date,
//       filters,
//       paginationOptions
//     );
//     if (result.data.length === 0) {
//       return next(
//         new ApiError('No Available Service found!', httpStatus.NOT_FOUND)
//       );
//     }
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       status: 'success',
//       message: 'Remaininig Available Service retrived successfully',
//       meta: result.meta,
//       data: result.data,
//     });
//   }
// );
const getDataById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listingProduct_service_1.ListingProductServices.getDataById(req.params.id);
    if (!result) {
        return next(new ApiError_1.default(`No Listing Product Found`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Yep! Listing Product Found Successfully',
        data: result,
    });
}));
// const getAvailAbleService: RequestHandler = catchAsync(
//   async (req, res, next) => {
//     const result = await AvailableServiceServices.getAvailAbleService(
//       req.params.id,
//       req.params.date
//     );
//     if (!result) {
//       return next(
//         new ApiError(
//           `No Available Service found with this id`,
//           httpStatus.NOT_FOUND
//         )
//       );
//     }
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       status: 'success',
//       message: 'Available Service retrived successfully',
//       data: result,
//     });
//   }
// );
const updateDataById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield listingProduct_service_1.ListingProductServices.updateDataById(req.params.id, payload);
    if (!result) {
        return next(new ApiError_1.default(`No Lising Product Found`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Yup! Listing Product Update Successfully',
        data: result,
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield listingProduct_service_1.ListingProductServices.updateStatus(req.params.id, payload);
    if (!result) {
        return next(new ApiError_1.default(`No Lising Product Found`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Yup! Listing Product Status Update Successfully',
        data: result,
    });
}));
const deleteDataById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listingProduct_service_1.ListingProductServices.deleteDataById(req.params.id);
    if (!result) {
        return next(new ApiError_1.default(`No Available Service found with this id`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Available Service deleted successfully',
        data: result,
    });
}));
// const getServiceByCategory: RequestHandler = catchAsync(async (req, res) => {
//   const result = await AvailableServiceServices.getDataByCategory(
//     req.params.categoryId
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     status: 'success',
//     message: 'Available Service retrived successfully',
//     data: result,
//   });
// });
exports.ListingProductController = {
    insertIntoDB: exports.insertIntoDB,
    getAllFromDB: exports.getAllFromDB,
    getDataById,
    deleteDataById,
    updateDataById,
    updateStatus,
    // updateDataById,
    // deleteDataById,
    // getServiceByCategory,
    // getRemainingServicesFromDB,
    // getAvailAbleService,
};
