/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName,dateOfBirth,teamId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_firstName_lastName_dateOfBirth_teamId_key" ON "Player"("firstName", "lastName", "dateOfBirth", "teamId");
