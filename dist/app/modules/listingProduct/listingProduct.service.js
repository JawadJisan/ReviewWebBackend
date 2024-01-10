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
exports.ListingProductServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// import { findFilterConditionsWithPrice } from '../../../shared/findFilterConditions';
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // const { serviceId } = data;
    // const service = await prisma.service.findUnique({
    //   where: {
    //     id: serviceId,
    //   },
    // });
    // const isExist = await prisma.availableService.findFirst({
    //   where: {
    //     serviceId: serviceId,
    //   },
    // });
    // if (isExist) {
    //   throw new ApiError(
    //     'This service already exist in available service list',
    //     httpStatus.CONFLICT
    //   );
    // }
    // data.categoryId = service?.serviceCategoryId as string;
    // data.price = service?.price as number;
    // data.serviceName = service?.serviceName as string;
    const result = yield prisma_1.default.listingProduct.create({
        data,
        // include: {
        //   service: {
        //     include: {
        //       serviceCategory: true,
        //     },
        //   },
        //   slots: {},
        // },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    // const { searchTerm, ...filterData } = filters;
    // const andConditions = findFilterConditionsWithPrice(
    //   searchTerm,
    //   filterData,
    //   listingProductSearchableFields,
    //   listingProductRelationalFields,
    //   listingProductRelationalFieldsMapper
    // );
    // const whereConditons: Prisma.AvailableServiceWhereInput =
    //   andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.listingProduct.findMany({
        // include: {
        //   service: {
        //     include: {
        //       serviceCategory: true,
        //     },
        //   },
        //   slots: {
        //     include: {
        //       serviceTeam: true,
        //     },
        //   },
        // },
        // where: whereConditons,
        skip,
        take: limit,
        orderBy: orderCondition,
    });
    const total = yield prisma_1.default.listingProduct.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
// const getAllRemainingServices = async (
//   date: string,
//   filters: IAvailableServiceFilters,
//   options: IpaginationOptions
// ): Promise<IGenericPaginationResponse<AvailableService[]>> => {
//   const { page, limit, skip } = calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;
//   const andConditions = findFilterConditionsWithPrice(
//     searchTerm,
//     filterData,
//     availableServiceSearchableFields,
//     availableServiceRelationalFields,
//     availableServiceRelationalFieldsMapper
//   );
//   const whereConditons: Prisma.AvailableServiceWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const orderCondition = orderByConditions(options);
//   const result = await prisma.availableService.findMany({
//     include: {
//       service: {
//         include: {
//           serviceCategory: true,
//         },
//       },
//       slots: {
//         include: {
//           serviceTeam: true,
//         },
//       },
//     },
//     where: whereConditons,
//     skip,
//     take: limit,
//     orderBy: orderCondition,
//   });
//   const total = await prisma.availableService.count();
//   if (date) {
//     const bookings = await prisma.booking.findMany({
//       where: {
//         date: date,
//         status: {
//           in: [BookingStatus.pending, BookingStatus.confirmed],
//         },
//       },
//     });
//     result.forEach(service => {
//       const serviceBooking = bookings.filter(
//         book => book.serviceId === service.id
//       );
//       const bookedSlots = serviceBooking.map(b => b.slotId);
//       const available = service.slots.filter(
//         slot => !bookedSlots.includes(slot.id)
//       );
//       service.slots = available;
//     });
//   }
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.listingProduct.findUnique({
        where: {
            id,
        },
        // include: {
        //   service: {
        //     include: {
        //       serviceCategory: true,
        //     },
        //   },
        //   slots: {
        //     include: {
        //       serviceTeam: true,
        //     },
        //   },
        // },
    });
    return result;
});
// const getAvailAbleService = async (id: string, date: string) => {
//   const result = await prisma.availableService.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       service: {
//         include: {
//           serviceCategory: true,
//         },
//       },
//       slots: {
//         include: {
//           serviceTeam: true,
//         },
//       },
//     },
//   });
//   const newService = result;
//   if (date) {
//     const bookings = await prisma.booking.findMany({
//       where: {
//         date: date,
//         status: {
//           in: [BookingStatus.pending, BookingStatus.confirmed],
//         },
//       },
//     });
//     const serviceBooking = bookings.filter(
//       book => book.serviceId === newService?.id
//     );
//     const bookedSlots = serviceBooking.map(b => b.slotId);
//     const available = newService?.slots.filter(
//       slot => !bookedSlots.includes(slot.id)
//     );
//     if (newService) {
//       //@ts-ignore
//       newService.slots = available as Slot[];
//     }
//     return newService;
//   }
// };
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.listingProduct.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const updateStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.listingProduct.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.listingProduct.delete({
        where: {
            id,
        },
    });
    return result;
});
// const getDataByCategory = async (
//   categoryId: string
// ): Promise<AvailableService[]> => {
//   const AvailableServices = await prisma.availableService.findMany({
//     include: {
//       service: {
//         include: {
//           serviceCategory: true,
//         },
//       },
//       slots: {
//         include: {
//           serviceTeam: true,
//         },
//       },
//     },
//     where: {
//       categoryId: categoryId,
//       slots: {},
//     },
//   });
//   if (!AvailableServices || AvailableServices.length === 0) {
//     throw new ApiError(
//       'No AvailableServices found for the specified category',
//       httpStatus.NOT_FOUND
//     );
//   }
//   return AvailableServices;
// };
exports.ListingProductServices = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    deleteDataById,
    updateDataById,
    updateStatus,
    // deleteDataById,
    // getDataByCategory,
    // getAllRemainingServices,
    // getAvailAbleService,
};
