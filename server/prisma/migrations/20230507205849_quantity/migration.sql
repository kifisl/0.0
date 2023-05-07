BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[basketproduct] ADD [Quantity] INT CONSTRAINT [basketproduct_Quantity_df] DEFAULT 1;

-- AlterTable
ALTER TABLE [dbo].[orderdetails] ADD [Quantity] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
