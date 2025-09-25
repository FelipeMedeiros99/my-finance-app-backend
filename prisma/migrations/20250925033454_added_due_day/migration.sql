/*
  Warnings:

  - You are about to drop the column `closeDate` on the `card` table. All the data in the column will be lost.
  - Added the required column `closeDay` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDay` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "card" DROP COLUMN "closeDate",
ADD COLUMN     "closeDay" SMALLINT NOT NULL,
ADD COLUMN     "dueDay" SMALLINT NOT NULL;
