import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceCategoryFilterableFields } from './serviceCategory.constant';
import { reviewCategoryService } from './serviceCategory.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  console.log(data, 'get body');
  const result = await reviewCategoryService.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Yup! Review Service Category Created',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, serviceCategoryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await reviewCategoryService.getAllFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(new ApiError('No Service Team found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Service Category retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await reviewCategoryService.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(
        `No Service Category found with this id`,
        httpStatus.NOT_FOUND
      )
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Service Category retrived successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await reviewCategoryService.updateDataById(
    req.params.id,
    payload
  );

  if (!result) {
    return next(
      new ApiError(
        `No Service Category found with this id`,
        httpStatus.NOT_FOUND
      )
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Service Category updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await reviewCategoryService.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(
        `No Service Category found with this id`,
        httpStatus.NOT_FOUND
      )
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Service Category deleted successfully',
    data: result,
  });
});

export const reviewCategoryController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
