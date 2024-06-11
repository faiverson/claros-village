-- CreateEnum
CREATE TYPE "roles" AS ENUM ('landlord', 'renter', 'admin', 'manager', 'guard');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "email_verified" TIMESTAMP(3),
    "avatar" TEXT,
    "role" "roles" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_owners" TEXT[],
    "email_expenses" TEXT[],
    "manzana" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phones" TEXT[],
    "is_owner" BOOLEAN NOT NULL,
    "is_duplex" BOOLEAN NOT NULL,
    "numero_expensas" TEXT,
    "direccion" TEXT,
    "floor" TEXT,
    "departament" TEXT,
    "neighborhood" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserResident" (
    "userId" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,

    CONSTRAINT "UserResident_pkey" PRIMARY KEY ("userId","residentId")
);

-- CreateTable
CREATE TABLE "accounts" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "sum_reservations" (
    "id" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "room_small" BOOLEAN NOT NULL,
    "room_big" BOOLEAN NOT NULL,
    "date_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "reserved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT,

    CONSTRAINT "sum_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "residents_email_key" ON "residents"("email");

-- AddForeignKey
ALTER TABLE "UserResident" ADD CONSTRAINT "UserResident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResident" ADD CONSTRAINT "UserResident_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sum_reservations" ADD CONSTRAINT "sum_reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
