/*
  Warnings:

  - Changed the type of `lama_sewa` on the `rent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `lama_sewa`,
    ADD COLUMN `lama_sewa` INTEGER NOT NULL;
