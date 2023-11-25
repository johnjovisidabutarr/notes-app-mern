-- AlterTable
ALTER TABLE `notes` ADD COLUMN `archive` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `bin` BOOLEAN NULL DEFAULT false;
