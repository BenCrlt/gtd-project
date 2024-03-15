-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "deletedAt" DROP NOT NULL;
