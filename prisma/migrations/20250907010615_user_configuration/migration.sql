/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register_data` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_userId_fkey";

-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL,
ADD COLUMN     "register_data" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "transaction";

-- DropEnum
DROP TYPE "TransactionType";
