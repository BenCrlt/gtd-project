/*
  Warnings:

  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_areaId_fkey";

-- DropTable
DROP TABLE "Area";
