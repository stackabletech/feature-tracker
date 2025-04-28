-- AlterTable
ALTER TABLE "_dependencies" ADD CONSTRAINT "_dependencies_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_dependencies_AB_unique";
