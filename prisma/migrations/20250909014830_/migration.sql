/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `register_data` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
DROP COLUMN "picture",
DROP COLUMN "register_data",
ADD COLUMN     "password" VARCHAR(200) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(200);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
