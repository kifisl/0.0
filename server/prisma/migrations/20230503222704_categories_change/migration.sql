/*
  Warnings:

  - You are about to drop the column `SubCategoryID` on the `productcategories` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[productcategories] DROP CONSTRAINT [FK_SubCategoriesFK];

-- DropForeignKey
ALTER TABLE [dbo].[products] DROP CONSTRAINT [FK_ProductSubCategoriesFK];

-- DropIndex
DROP INDEX [index_SubCategoryID] ON [dbo].[productcategories];

-- AlterTable
ALTER TABLE [dbo].[productcategories] DROP COLUMN [SubCategoryID];

-- CreateTable
CREATE TABLE [dbo].[productsubcategories] (
    [SubCategoryID] INT NOT NULL IDENTITY(1,1),
    [SubCategoryName] VARCHAR(50),
    CONSTRAINT [PK_producsubtcategories] PRIMARY KEY CLUSTERED ([SubCategoryID]),
    CONSTRAINT [index_SubCategoryID] UNIQUE NONCLUSTERED ([SubCategoryID])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_SubCategoryName] ON [dbo].[productsubcategories]([SubCategoryName]);

-- AddForeignKey
ALTER TABLE [dbo].[products] ADD CONSTRAINT [FK_ProductSubCategoriesFK] FOREIGN KEY ([ProductSubCategory]) REFERENCES [dbo].[productsubcategories]([SubCategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
