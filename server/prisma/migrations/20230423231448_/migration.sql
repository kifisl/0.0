/*
  Warnings:

  - A unique constraint covering the columns `[tokenID]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[token] ADD CONSTRAINT [token_tokenID_key] UNIQUE NONCLUSTERED ([tokenID]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
