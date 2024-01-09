-- CreateEnum
CREATE TYPE "SupportStatus" AS ENUM ('LONG_TERM_SUPPORT', 'GENERAL_AVAILABILITY', 'DEPRECATED', 'END_OF_LIFE');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "code_name" TEXT;

-- CreateTable
CREATE TABLE "release_versions" (
    "version" TEXT NOT NULL,
    "release_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "release_versions_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "product_versions" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "product_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_lifecycles" (
    "product_version_id" INTEGER NOT NULL,
    "release_id" INTEGER NOT NULL,
    "support_status" "SupportStatus" NOT NULL
);

-- CreateTable
CREATE TABLE "release_components" (
    "product_version_id" INTEGER NOT NULL,
    "release_version" TEXT NOT NULL,
    "purl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "product_versions_version_product_id_key" ON "product_versions"("version", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_lifecycles_release_id_product_version_id_key" ON "product_lifecycles"("release_id", "product_version_id");

-- CreateIndex
CREATE UNIQUE INDEX "release_components_purl_release_version_key" ON "release_components"("purl", "release_version");

-- AddForeignKey
ALTER TABLE "product_versions" ADD CONSTRAINT "product_versions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_lifecycles" ADD CONSTRAINT "product_lifecycles_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_lifecycles" ADD CONSTRAINT "product_lifecycles_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "releases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "release_components" ADD CONSTRAINT "release_components_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "release_components" ADD CONSTRAINT "release_components_release_version_fkey" FOREIGN KEY ("release_version") REFERENCES "release_versions"("version") ON DELETE RESTRICT ON UPDATE CASCADE;
