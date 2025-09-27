/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "account_name_userId_key";

-- DropIndex
DROP INDEX "card_name_userId_key";

-- DropIndex
DROP INDEX "category_name_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_name_key" ON "account"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "card_userId_name_key" ON "card"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "category_userId_name_key" ON "category"("userId", "name");
