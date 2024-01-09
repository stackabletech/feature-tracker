-- AddForeignKey
ALTER TABLE "release_versions" ADD CONSTRAINT "release_versions_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "releases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
