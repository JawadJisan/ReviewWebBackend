import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { listingProductRelationalFields } from './listingProduct.constant';
import { ListingProductServices } from './listingProduct.service';
// import { AvailableServiceServices } from './availableService.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await ListingProductServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Yup! Your Listing was sent to moderator for Aprove',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, listingProductRelationalFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ListingProductServices.getAllFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(
        new ApiError('No Listing Product Found', httpStatus.NOT_FOUND)
      );
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Listing Product retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

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

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await ListingProductServices.getDataById(req.params.id);

  if (!result) {
    return next(new ApiError(`No Listing Product Found`, httpStatus.NOT_FOUND));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Yep! Listing Product Found Successfully',
    data: result,
  });
});

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

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await ListingProductServices.updateDataById(
    req.params.id,
    payload
  );

  if (!result) {
    return next(new ApiError(`No Lising Product Found`, httpStatus.NOT_FOUND));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Yup! Listing Product Update Successfully',
    data: result,
  });
});

const updateStatus: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await ListingProductServices.updateStatus(
    req.params.id,
    payload
  );

  if (!result) {
    return next(new ApiError(`No Lising Product Found`, httpStatus.NOT_FOUND));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Yup! Listing Product Status Update Successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await ListingProductServices.deleteDataById(req.params.id);
  if (!result) {
    return next(
      new ApiError(
        `No Available Service found with this id`,
        httpStatus.NOT_FOUND
      )
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Available Service deleted successfully',
    data: result,
  });
});

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

export const ListingProductController = {
  insertIntoDB,
  getAllFromDB,
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
