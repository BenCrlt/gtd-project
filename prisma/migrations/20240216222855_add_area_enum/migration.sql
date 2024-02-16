/*
  Warnings:

  - You are about to drop the column `areaId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `areaId` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Area" AS ENUM ('WORK', 'PERSONAL', 'HOBBIES', 'HEALTH', 'LEARNING');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "areaId",
ADD COLUMN     "area" "Area";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "areaId",
ADD COLUMN     "area" "Area";
