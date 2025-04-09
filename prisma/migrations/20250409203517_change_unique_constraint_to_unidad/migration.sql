/*
  Warnings:

  - A unique constraint covering the columns `[unidad]` on the table `residents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "residents_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "residents_unidad_key" ON "residents"("unidad");
