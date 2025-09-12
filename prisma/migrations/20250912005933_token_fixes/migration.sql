/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Token" DROP CONSTRAINT "Token_pkey",
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "public"."Token"("token");
