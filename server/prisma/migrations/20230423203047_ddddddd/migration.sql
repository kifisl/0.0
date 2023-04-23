BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_ActivationLink_key];

-- AlterTable
ALTER TABLE [dbo].[token] ALTER COLUMN [refreshToken] NVARCHAR(350) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[users] ALTER COLUMN [ActivationLink] VARCHAR(250) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_ActivationLink_key] UNIQUE NONCLUSTERED ([ActivationLink]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
