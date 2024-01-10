/*
  Warnings:

  - You are about to drop the column `fullName` on the `newUserModel` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageUrl` on the `newUserModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "newUserModel" DROP COLUMN "fullName",
DROP COLUMN "profileImageUrl",
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "linkedIn" TEXT,
ADD COLUMN     "other" TEXT[],
ADD COLUMN     "twitter" TEXT;
