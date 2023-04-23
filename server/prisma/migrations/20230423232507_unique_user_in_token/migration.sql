/*
  Warnings:

  - A unique constraint covering the columns `[UserID]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[token] ADD CONSTRAINT [token_UserID_key] UNIQUE NONCLUSTERED ([UserID]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
