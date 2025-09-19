/*
  Warnings:

  - You are about to drop the column `descriptioin` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `description` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "descriptioin",
ADD COLUMN     "description" VARCHAR(30) NOT NULL;
