/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[token] ADD CONSTRAINT [token_refreshToken_key] UNIQUE NONCLUSTERED ([refreshToken]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
