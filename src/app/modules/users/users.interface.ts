import {
  Comment,
  ContactDetails,
  Gender,
  Review,
  UserRole,
  reviewUserRole,
} from '@prisma/client';

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  email?: string | undefined;
  gender?: string | undefined;
};

export interface ReviewUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  email: string;
  userName: string;
  contactNumber: string;
  password: string;
  gender: Gender; // Assuming Gender is an enum type
  profileImageUrl: string;
  address: string;
  role: reviewUserRole;
  contactDetails?: ContactDetails;
  reviews: Review[];
  comment: Comment[];
  // reviewAndRatings: ReviewAndRating[]; // Uncomment if this relation is added
}
export interface InewUserModel {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  // password: string;
  // gender: Gender;
  profileImageUrl: string;
  address: string;
  role: reviewUserRole;
}

export type IUserData = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  contactNumber: string;
  address: string;
  profileImageUrl: string;
  gender: Gender;
};

export type ISigninUser = {
  email: string;
  password: string;
};

export type ISigninUserReview = {
  userName: string;
  password: string;
};

export type ISigninUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
