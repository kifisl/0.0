BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[basketproduct] DROP CONSTRAINT [FK_basketProductFK];

-- DropForeignKey
ALTER TABLE [dbo].[comments] DROP CONSTRAINT [FK_CommentProductPK];

-- DropForeignKey
ALTER TABLE [dbo].[Favorites] DROP CONSTRAINT [FK_FavoriteProductFK];

-- DropForeignKey
ALTER TABLE [dbo].[orderdetails] DROP CONSTRAINT [FK_DetailsProductFK];

-- AddForeignKey
ALTER TABLE [dbo].[basketproduct] ADD CONSTRAINT [FK_basketProductFK] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[comments] ADD CONSTRAINT [FK_CommentProductPK] FOREIGN KEY ([CommentProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [FK_FavoriteProductFK] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[orderdetails] ADD CONSTRAINT [FK_DetailsProductFK] FOREIGN KEY ([DetailsProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
