/*
  Warnings:

  - You are about to drop the column `dueData` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "dueData",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;
