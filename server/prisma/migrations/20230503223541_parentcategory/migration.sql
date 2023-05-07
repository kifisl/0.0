BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[productsubcategories] ADD [ParentCategoryID] INT;

-- AddForeignKey
ALTER TABLE [dbo].[productsubcategories] ADD CONSTRAINT [FK_parentCategory] FOREIGN KEY ([ParentCategoryID]) REFERENCES [dbo].[productcategories]([CategoryID]) ON DELETE SET NULL ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
