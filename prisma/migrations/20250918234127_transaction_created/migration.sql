-- AlterTable
ALTER TABLE "account" ALTER COLUMN "openingBalance" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "descriptioin" VARCHAR(30) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "dueData" TIMESTAMP(3) NOT NULL,
    "type" "CategoryType" NOT NULL,
    "wasConfirm" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
