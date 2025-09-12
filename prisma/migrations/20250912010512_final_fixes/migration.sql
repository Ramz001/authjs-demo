/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `mfa_enabled` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `token` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mfa_enabled_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Session_session_token_key";

-- AlterTable
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Session" DROP COLUMN "session_token",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "mfa_enabled",
ADD COLUMN     "mfa_enabled_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "public"."Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "public"."Session"("token");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "public"."Session"("user_id");

-- CreateIndex
CREATE INDEX "Token_type_idx" ON "public"."Token"("type");

-- CreateIndex
CREATE INDEX "Token_expires_idx" ON "public"."Token"("expires");
