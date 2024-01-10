import { Review } from '@prisma/client';

import prisma from '../../../shared/prisma';

import { JwtPayload } from 'jsonwebtoken';

const AddReview = async (
  verifiedUser: JwtPayload,
  data: Review
): Promise<Review> => {
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
  const result = await prisma.review.create({
    data,
    include: {
      author: true,
      product: true,
    },
  });
  return result;
};

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

const getAllFromDB = async () => {
  const result = await prisma.review.findMany({
    include: {
      author: true,
      product: true,
    },
  });
  const total = await prisma.review.count();
  return {
    meta: {
      total,
    },
    data: result,
  };
};

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

export const ReviewAndRatingServices = {
  AddReview,
  getAllFromDB,
};
