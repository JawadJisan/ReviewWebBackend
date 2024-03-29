import { Prisma, reviewCategory } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { serviceCategorySearchableFields } from './serviceCategory.constant';
import { IServiceCategoryFilters } from './serviceCategory.interface';

const insertIntoDB = async (data: reviewCategory): Promise<reviewCategory> => {
  const result = await prisma.reviewCategory.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IServiceCategoryFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<reviewCategory[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    serviceCategorySearchableFields
  );

  const whereConditons: Prisma.reviewCategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.reviewCategory.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.reviewCategory.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<reviewCategory | null> => {
  const result = await prisma.reviewCategory.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<reviewCategory>
): Promise<reviewCategory> => {
  const result = await prisma.reviewCategory.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<reviewCategory> => {
  const result = await prisma.reviewCategory.delete({
    where: {
      id,
    },
  });

  return result;
};

export const reviewCategoryService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
