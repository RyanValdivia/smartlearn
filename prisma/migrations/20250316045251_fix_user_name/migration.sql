/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dni` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "dni" SET NOT NULL;
