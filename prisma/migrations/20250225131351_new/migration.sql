/*
  Warnings:

  - You are about to drop the column `password` on the `StorePassword` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordhmac` to the `StorePassword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordpayload` to the `StorePassword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordhmac` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordpayload` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StorePassword" DROP COLUMN "password",
ADD COLUMN     "passwordhmac" TEXT NOT NULL,
ADD COLUMN     "passwordpayload" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordhmac" TEXT NOT NULL,
ADD COLUMN     "passwordpayload" TEXT NOT NULL;
