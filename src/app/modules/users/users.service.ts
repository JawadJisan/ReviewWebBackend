import { Prisma, Users, newUserModel } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './users.constant';
import {
  IRefreshTokenResponse,
  ISigninUserResponse,
  ISigninUserReview,
  IUserData,
  IUserFilterRequest,
  InewUserModel,
} from './users.interface';

/* 
fullName        String?
  email           String         @unique
  userName        String         @unique
  password        String
  profileImageUrl String?
  address         String?
  role    
*/

const insertIntoDB = async (data: newUserModel): Promise<InewUserModel> => {
  const {
    fullName,
    email,
    password,
    role,
    address,
    userName,
    profileImageUrl,
  } = data;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const newData = {
    fullName,
    userName,
    email,
    password: hashedPassword,
    address,
    profileImageUrl,
    role,
  };
  // const result = await prisma.users.create({ data: newData });
  const result = await prisma.newUserModel.create({ data: newData });
  const newResultData = {
    id: result.id,
    fullName: result.fullName,
    userName: result.userName,
    email: result.email,
    role: result.role,
    address: result.address,
    profileImageUrl: result.profileImageUrl,
  };

  return newResultData;
};

const loginUser = async (
  data: ISigninUserReview
): Promise<ISigninUserResponse> => {
  const { userName, password } = data;

  // check user exist
  const user = await prisma.newUserModel.findUnique({
    where: { userName },
  });

  if (!user) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

  // create access token
  const { id: userId, role, email: userEmail } = user;
  const accessToken = jwtHelpers.createToken(
    { userId, role, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role, userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getAllFromDB = async (
  filters: IUserFilterRequest,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Partial<newUserModel>[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    userSearchableFields
  );

  const whereConditons: Prisma.newUserModelWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.newUserModel.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
    // select: {
    //   id: true,
    //   fullName: true,
    //   userName: true,
    //   email: true,
    //   role: true,
    //   address: true,
    //   profileImageUrl: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });

  const total = await prisma.newUserModel.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Partial<Users> | null> => {
  const result = await prisma.newUserModel.findUnique({
    where: {
      id,
    },
    // select: {
    //   id: true,
    //   fullName: true,
    //   email: true,
    //   role: true,
    //   contactNumber: true,
    //   address: true,
    //   profileImageUrl: true,
    //   gender: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<newUserModel>
): Promise<newUserModel> => {
  const existingUser = await prisma.newUserModel.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new ApiError('Opps! user not found!', httpStatus.NOT_FOUND);
  }

  const result = await prisma.newUserModel.update({
    where: {
      id,
    },
    data: {
      ...payload,
      password: payload.password
        ? await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
        : undefined,
    },
    // select: {
    //   id: true,
    //   fullName: true,
    //   email: true,
    //   role: true,
    //   address: true,
    //   profileImageUrl: true,
    //   userName: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Partial<newUserModel>> => {
  const result = await prisma.newUserModel.delete({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      address: true,
      profileImageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getProfileData = async (
  verifiedUser: JwtPayload
): Promise<Users | null> => {
  const user = await prisma.newUserModel.findUnique({
    where: { id: verifiedUser.userId },
  });

  if (!user) {
    throw new ApiError('No user found with this id', httpStatus.UNAUTHORIZED);
  }

  return user;
};

const updateProfileDataById = async (
  verifiedUser: JwtPayload,
  payload: Partial<Users>
): Promise<IUserData> => {
  const existingUser = await prisma.users.findUnique({
    where: { id: verifiedUser.userId },
  });

  if (!existingUser) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  if (
    payload.role === 'admin' ||
    payload.role === 'super_admin' ||
    payload.role === 'customer' ||
    payload.role === 'team_member'
  ) {
    throw new ApiError('You can not change role', httpStatus.NOT_FOUND);
  }

  const result = await prisma.users.update({
    where: {
      id: verifiedUser.userId,
    },
    data: {
      ...payload,
      password: payload.password
        ? await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
        : undefined,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      profileImageUrl: true,
      gender: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError('Invalid Refresh Token', httpStatus.FORBIDDEN);
  }

  const { userId } = verifiedToken;

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }
  const { id, role, email: userEmail } = user;
  const accessToken = jwtHelpers.createToken(
    { userId: id, role, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: accessToken,
  };
};

export const UsersServices = {
  insertIntoDB,
  loginUser,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getProfileData,
  refreshToken,
  updateProfileDataById,
};
