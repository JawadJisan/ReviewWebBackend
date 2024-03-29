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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const findFilterConditions_1 = require("../../../shared/findFilterConditions");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const users_constant_1 = require("./users.constant");
/*
fullName        String?
  email           String         @unique
  userName        String         @unique
  password        String
  profileImageUrl String?
  address         String?
  role
*/
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    
    id             String          @id @default(uuid())
    createdAt      DateTime        @default(now()) @map("createdAt")
    updatedAt      DateTime        @updatedAt @map("updatedAt")
    firstName      String?
    lastName       String?
    email          String          @unique
    userName       String          @unique
    password       String
    facebook       String?
    twitter        String?
    linkedIn       String?
    other          String?
    imageUrl       String?
    address        String?
    role           reviewUserRole  @default(user)
    Review         Review[]
    Comment        Comment[]
    ContactDetails ContactDetails?
    */
    const { email, password, role, address, userName, firstName, lastName, facebook, twitter, linkedIn, other, imageUrl, } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const newData = {
        userName,
        email,
        password: hashedPassword,
        address,
        firstName,
        lastName,
        role,
        facebook,
        twitter,
        linkedIn,
        other,
        imageUrl,
    };
    const result = yield prisma_1.default.newUserModel.create({ data: newData });
    return result;
});
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = data;
    // check user exist
    const user = yield prisma_1.default.newUserModel.findUnique({
        where: { userName },
    });
    if (!user) {
        throw new ApiError_1.default('User does not exist', http_status_1.default.NOT_FOUND);
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new ApiError_1.default('Password is incorrect', http_status_1.default.UNAUTHORIZED);
    }
    // create access token
    const { id: userId, role, email: userEmail } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, userEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, userEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditionsWithoutRelation)(searchTerm, filterData, users_constant_1.userSearchableFields);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.newUserModel.findMany({
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
    const total = yield prisma_1.default.newUserModel.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.newUserModel.findUnique({
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
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.newUserModel.findUnique({
        where: { id: id },
    });
    if (!existingUser) {
        throw new ApiError_1.default('Opps! user not found!', http_status_1.default.NOT_FOUND);
    }
    const result = yield prisma_1.default.newUserModel.update({
        where: {
            id,
        },
        data: Object.assign(Object.assign({}, payload), { password: payload.password
                ? yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds))
                : undefined }),
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
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.newUserModel.delete({
        where: {
            id,
        },
    });
    return result;
});
const getProfileData = (verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.newUserModel.findUnique({
        where: { id: verifiedUser.userId },
    });
    if (!user) {
        throw new ApiError_1.default('No user found with this id', http_status_1.default.UNAUTHORIZED);
    }
    return user;
});
exports.UsersServices = {
    insertIntoDB,
    loginUser,
    getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
    getProfileData,
};
