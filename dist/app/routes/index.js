"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listingProduct_routes_1 = require("../modules/listingProduct/listingProduct.routes");
const reviewAndRating_routes_1 = require("../modules/reviewAndRating/reviewAndRating.routes");
const serviceCategory_routes_1 = require("../modules/serviceCategory/serviceCategory.routes");
const auth_routes_1 = require("../modules/users/auth.routes");
const profile_routes_1 = require("../modules/users/profile.routes");
const users_routes_1 = require("../modules/users/users.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/users',
        route: users_routes_1.userRoutes,
    },
    {
        path: '/profile',
        route: profile_routes_1.profileRoutes,
    },
    {
        path: '/reviewCategory',
        route: serviceCategory_routes_1.reviewCategoryRoute,
    },
    {
        path: '/listingProduct',
        route: listingProduct_routes_1.ListingProductRoutes,
    },
    {
        path: '/reviewAndRating',
        route: reviewAndRating_routes_1.reviewAndRatingRoutes,
    },
    // {
    //   path: '/specialization',
    //   route: specializationRoutes,
    // },
    // {
    //   path: '/service-team',
    //   route: serviceTeamRoutes,
    // },
    // {
    //   path: '/service',
    //   route: serviceRoutes,
    // },
    // {
    //   path: '/available-service',
    //   route: availableServiceRoutes,
    // },
    // {
    //   path: '/upcoming-service',
    //   route: upcomingServiceRoutes,
    // },
    // {
    //   path: '/booking',
    //   route: bookingRoutes,
    // },
    // {
    //   path: '/review-and-rating',
    //   route: reviewAndRatingRoutes,
    // },
    // {
    //   path: '/payment',
    //   route: paymentRoutes,
    // },
    // {
    //   path: '/blog',
    //   route: blogPostRoutes,
    // },
    // {
    //   path: '/faq',
    //   route: faqRoutes,
    // },
    // {
    //   path: '/stats',
    //   route: statsRoutes,
    // },
    // {
    //   path: '/featured',
    //   route: featuredInRoutes,
    // },
    // {
    //   path: '/notification',
    //   route: notificationRoutes,
    // },
    // { path: '/website-content', route: websiteContentRoutes },
    // {
    //   path: '/showcase',
    //   route: showcaseWorkRoutes,
    // },
    // {
    //   path: '/slots',
    //   route: slotsRoutes,
    // },
    // {
    //   path: '/team-member',
    //   route: teamMemberRoutes,
    // },
    // {
    //   path: '/feedback',
    //   route: feedbackRoutes,
    // },
];
// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
