/*
  Warnings:

  - The values [USER,ADMIN,MANAGER,GUARD] on the enum `roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "roles_new" AS ENUM ('landlord', 'renter', 'admin', 'manager', 'guard');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "roles_new" USING ("role"::text::"roles_new");
ALTER TYPE "roles" RENAME TO "roles_old";
ALTER TYPE "roles_new" RENAME TO "roles";
DROP TYPE "roles_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "UserResident" (
    "userId" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,

    CONSTRAINT "UserResident_pkey" PRIMARY KEY ("userId","residentId")
);

-- AddForeignKey
ALTER TABLE "UserResident" ADD CONSTRAINT "UserResident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResident" ADD CONSTRAINT "UserResident_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
