/*
  Warnings:

  - Added the required column `userId` to the `cardExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cardExpense" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cardExpense" ADD CONSTRAINT "cardExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
