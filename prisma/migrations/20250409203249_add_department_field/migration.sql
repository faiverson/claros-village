/*
  Warnings:

  - You are about to drop the column `departament` on the `residents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "residents" DROP COLUMN "departament",
ADD COLUMN     "department" TEXT;

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);
