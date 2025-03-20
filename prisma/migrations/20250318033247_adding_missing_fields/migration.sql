/*
  Warnings:

  - You are about to drop the column `montlyTuition` on the `cycles` table. All the data in the column will be lost.
  - The primary key for the `student_enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sectionId` on the `student_enrollments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,lectureId]` on the table `student_enrollments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alias]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monthlyTuition` to the `cycles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureId` to the `student_enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alias` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student_enrollments" DROP CONSTRAINT "student_enrollments_sectionId_fkey";

-- AlterTable
ALTER TABLE "cycles" DROP COLUMN "montlyTuition",
ADD COLUMN     "monthlyTuition" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "cycleId" INTEGER;

-- AlterTable
ALTER TABLE "student_enrollments" DROP CONSTRAINT "student_enrollments_pkey",
DROP COLUMN "sectionId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "lectureId" INTEGER NOT NULL,
ADD CONSTRAINT "student_enrollments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "cycleId" INTEGER NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_strategy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "evaluation_strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "isWeighted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "taskId" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "strategyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_alias_key" ON "units"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "evaluation_strategy_alias_key" ON "evaluation_strategy"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "student_enrollments_studentId_lectureId_key" ON "student_enrollments"("studentId", "lectureId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_alias_key" ON "subjects"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "users_dni_key" ON "users"("dni");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "cycles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "cycles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_strategy" ADD CONSTRAINT "evaluation_strategy_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "evaluation_strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "student_enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
