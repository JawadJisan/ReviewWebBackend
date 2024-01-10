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
exports.ReviewAndRatingServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AddReview = (verifiedUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    // const booking = await prisma.booking.findFirst({
    //   where: {
    //     userId: verifiedUser.userId,
    //     serviceId: data.serviceId,
    //   },
    // });
    // if (booking && booking.status === 'confirmed') {
    //   return result;
    // } else {
    //   throw new ApiError(
    //     `You must have a confirmed booking for this service to add a review`,
    //     httpStatus.NOT_FOUND
    //   );
    // }
    const result = yield prisma_1.default.review.create({
        data,
        include: {
            author: true,
            product: true,
        },
    });
    return result;
});
// const insertIntoDB = async (
//   verifiedUser: JwtPayload,
//   data: ReviewAndRating
// ): Promise<ReviewAndRating> => {
//   const booking = await prisma.booking.findFirst({
//     where: {
//       userId: verifiedUser.userId,
//       serviceId: data.serviceId,
//     },
//   });
//   if (booking && booking.status === 'confirmed') {
//     const result = await prisma.reviewAndRating.create({
//       data,
//       include: {
//         user: true,
//         service: true,
//       },
//     });
//     return result;
//   } else {
//     throw new ApiError(
//       `You must have a confirmed booking for this service to add a review`,
//       httpStatus.NOT_FOUND
//     );
//   }
// };
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            author: true,
            product: true,
        },
    });
    const total = yield prisma_1.default.review.count();
    return {
        meta: {
            total,
        },
        data: result,
    };
});
// const getDataById = async (id: string): Promise<ReviewAndRating | null> => {
//   const result = await prisma.reviewAndRating.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: true,
//       service: true,
//     },
//   });
//   return result;
// };
// const updateDataById = async (
//   id: string,
//   payload: Partial<ReviewAndRating>
// ): Promise<ReviewAndRating> => {
//   const result = await prisma.reviewAndRating.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       user: true,
//       service: true,
//     },
//   });
//   return result;
// };
// const deleteDataById = async (id: string): Promise<ReviewAndRating> => {
//   const result = await prisma.reviewAndRating.delete({
//     where: {
//       id,
//     },
//     include: {
//       user: true,
//       service: true,
//     },
//   });
//   return result;
// };
exports.ReviewAndRatingServices = {
    AddReview,
    getAllFromDB,
};
