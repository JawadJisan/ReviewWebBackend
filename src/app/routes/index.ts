/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express';
import { ListingProductRoutes } from '../modules/listingProduct/listingProduct.routes';
import { reviewAndRatingRoutes } from '../modules/reviewAndRating/reviewAndRating.routes';
import { reviewCategoryRoute } from '../modules/serviceCategory/serviceCategory.routes';
import { authRoutes } from '../modules/users/auth.routes';
import { profileRoutes } from '../modules/users/profile.routes';
import { userRoutes } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/reviewCategory',
    route: reviewCategoryRoute,
  },
  {
    path: '/listingProduct',
    route: ListingProductRoutes,
  },
  {
    path: '/reviewAndRating',
    route: reviewAndRatingRoutes,
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

export default router;
