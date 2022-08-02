/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `challenges` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "challenges" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "challenges_slug_key" ON "challenges"("slug");
