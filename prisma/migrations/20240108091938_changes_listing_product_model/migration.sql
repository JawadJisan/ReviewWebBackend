/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ListingProduct` table. All the data in the column will be lost.
  - Added the required column `category` to the `ListingProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListingProduct" DROP CONSTRAINT "ListingProduct_categoryId_fkey";

-- AlterTable
ALTER TABLE "ListingProduct" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;
