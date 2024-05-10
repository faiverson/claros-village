-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "residents_email_key" ON "residents"("email");
