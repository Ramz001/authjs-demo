/*
  Warnings:

  - Added the required column `user_id` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Token" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
