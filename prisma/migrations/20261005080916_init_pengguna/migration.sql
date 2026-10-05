-- CreateEnum
CREATE TYPE "PeranPengguna" AS ENUM ('ADMIN', 'PENDAMPING');

-- CreateTable
CREATE TABLE "pengguna" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kataSandiHash" TEXT NOT NULL,
    "peran" "PeranPengguna" NOT NULL,
    "kontak" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");
