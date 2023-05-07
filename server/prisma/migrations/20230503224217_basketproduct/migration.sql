/*
  Warnings:

  - You are about to drop the column `ProductID` on the `basket` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[basket] DROP CONSTRAINT [FK_basketProductFK];

-- DropIndex
DROP INDEX [index_BasketProductID] ON [dbo].[basket];

-- AlterTable
ALTER TABLE [dbo].[basket] DROP COLUMN [ProductID];

-- CreateTable
CREATE TABLE [dbo].[basketproduct] (
    [BasketProductID] INT NOT NULL IDENTITY(1,1),
    [ProductID] INT,
    CONSTRAINT [PK_basketproduct] PRIMARY KEY CLUSTERED ([BasketProductID]),
    CONSTRAINT [index_BasketProductID] UNIQUE NONCLUSTERED ([BasketProductID])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_BasketProductProductID] ON [dbo].[basketproduct]([ProductID]);

-- AddForeignKey
ALTER TABLE [dbo].[basketproduct] ADD CONSTRAINT [FK_basketProductFK] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
