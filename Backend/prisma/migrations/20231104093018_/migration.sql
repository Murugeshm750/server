-- CreateTable
CREATE TABLE "Bugs" (
    "id" SERIAL NOT NULL,
    "bugName" TEXT NOT NULL,
    "bugStatus" TEXT NOT NULL,
    "tracker" TEXT NOT NULL DEFAULT 'Bug',
    "priority" TEXT NOT NULL,
    "assignee" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bugs_id_key" ON "Bugs"("id");
