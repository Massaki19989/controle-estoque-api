/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "cpf" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");
