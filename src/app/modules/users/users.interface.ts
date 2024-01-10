import {
  Comment,
  ContactDetails,
  Review,
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
  profileImageUrl: string;
  address: string;
  role: reviewUserRole;
  contactDetails?: ContactDetails;
  reviews: Review[];
  comment: Comment[];
  // reviewAndRatings: ReviewAndRating[]; // Uncomment if this relation is added
}
export interface InewUserModel {
  // id: string;
  // fullName: string;
  userName: string;
  email: string;
  password: string;
  address: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
  facebook: string | null;
  twitter: string | null;
  linkedIn: string | null;
  other: string | null;
  imageUrl: string | null;
}

export type IUserData = {
  id: string;
  fullName: string;
  email: string;

  contactNumber: string;
  address: string;
  profileImageUrl: string;
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
