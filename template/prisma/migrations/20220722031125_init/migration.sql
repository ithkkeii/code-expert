-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT 'Easy',
    "content" TEXT NOT NULL DEFAULT '',
    "point" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_cases" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "challengeId" TEXT,

    CONSTRAINT "test_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_inputs" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "challengeId" TEXT,

    CONSTRAINT "test_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_title_key" ON "challenges"("title");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_slug_key" ON "challenges"("slug");

-- AddForeignKey
ALTER TABLE "test_cases" ADD CONSTRAINT "test_cases_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_inputs" ADD CONSTRAINT "test_inputs_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
