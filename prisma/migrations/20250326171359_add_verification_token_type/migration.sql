-- CreateEnum
CREATE TYPE "VerificationTokenType" AS ENUM ('register');

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "type" "VerificationTokenType" NOT NULL DEFAULT 'register';
