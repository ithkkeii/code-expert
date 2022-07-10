-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "level" "Level" NOT NULL DEFAULT 'Easy',
    "point" INTEGER NOT NULL,
    "seed" TEXT,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_cases" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "challengeId" INTEGER,

    CONSTRAINT "test_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_inputs" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "challengeId" INTEGER,

    CONSTRAINT "test_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "challenges_title_key" ON "challenges"("title");

-- AddForeignKey
ALTER TABLE "test_cases" ADD CONSTRAINT "test_cases_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_inputs" ADD CONSTRAINT "test_inputs_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
