-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "type" "CategoryType" NOT NULL DEFAULT 'EXPENSE';
