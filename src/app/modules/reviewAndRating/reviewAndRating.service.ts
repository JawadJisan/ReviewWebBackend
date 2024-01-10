import prisma from '../../../shared/prisma';

// const AddReview = async (data: Review): Promise<Review> => {
//   const result = await prisma.review.create({
//     data,
//     include: {
//       author: true,
//       product: true,
//     },
//   });

//   return result;
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

export const ReviewAndRatingServices = {
  // AddReview,
  getAllFromDB,
};
