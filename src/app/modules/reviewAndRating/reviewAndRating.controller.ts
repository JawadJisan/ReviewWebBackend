import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewAndRatingServices } from './reviewAndRating.service';

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

export const AddReview: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const token = req.headers.authorization;

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as string
  );
  const result = await ReviewAndRatingServices.AddReview(verifiedUser, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Yup! Review created successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await ReviewAndRatingServices.getAllFromDB();
    if (result.data.length === 0) {
      return next(new ApiError('No Review found!', httpStatus.NOT_FOUND));
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Yup! Review retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
//   const result = await ReviewAndRatingServices.getDataById(req.params.id);

//   if (!result) {
//     return next(
//       new ApiError(`No Review found with this id`, httpStatus.NOT_FOUND)
//     );
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     status: 'success',
//     message: 'Review retrived successfully',
//     data: result,
//   });
// });

// const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
//   const payload = req.body;

//   const result = await ReviewAndRatingServices.updateDataById(
//     req.params.id,
//     payload
//   );

//   if (!result) {
//     return next(
//       new ApiError(`No Review found with this id`, httpStatus.NOT_FOUND)
//     );
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     status: 'success',
//     message: 'Review updated successfully',
//     data: result,
//   });
// });

// const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
//   const result = await ReviewAndRatingServices.deleteDataById(req.params.id);

//   if (!result) {
//     return next(
//       new ApiError(`No Review found with this id`, httpStatus.NOT_FOUND)
//     );
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     status: 'success',
//     message: 'Review deleted successfully',
//     data: result,
//   });
// });

export const ReviewAndRatingController = {
  getAllFromDB,
  AddReview,
};
