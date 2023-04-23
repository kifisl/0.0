BEGIN TRY

BEGIN TRAN;

-- DropIndex
DROP INDEX [index_UserPassword] ON [dbo].[users];

-- AlterTable
ALTER TABLE [dbo].[users] ALTER COLUMN [UserPassword] VARCHAR(270) NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_UserPassword] ON [dbo].[users]([UserPassword]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
