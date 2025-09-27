/*
  Warnings:

  - Added the required column `userId` to the `cardPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cardPayment" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cardPayment" ADD CONSTRAINT "cardPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
