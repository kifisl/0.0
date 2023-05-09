BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[orders] ADD CONSTRAINT [orders_OrderStatus_df] DEFAULT 1 FOR [OrderStatus];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
