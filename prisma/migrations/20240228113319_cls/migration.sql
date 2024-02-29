/*
  Warnings:

  - You are about to alter the column `harga_perhari` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `nopol` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `harga_perhari` INTEGER NOT NULL DEFAULT 0;
