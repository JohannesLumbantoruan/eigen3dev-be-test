/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book_loans" DROP CONSTRAINT "book_loans_book_id_fkey";

-- DropForeignKey
ALTER TABLE "book_loans" DROP CONSTRAINT "book_loans_member_id_fkey";

-- DropForeignKey
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_member_id_fkey";

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_username_key" ON "members"("username");

-- AddForeignKey
ALTER TABLE "book_loans" ADD CONSTRAINT "book_loans_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_loans" ADD CONSTRAINT "book_loans_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalties" ADD CONSTRAINT "penalties_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("code") ON DELETE CASCADE ON UPDATE CASCADE;
