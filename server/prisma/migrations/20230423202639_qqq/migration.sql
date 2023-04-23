BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[address] (
    [AddressID] INT NOT NULL IDENTITY(1,1),
    [Country] VARCHAR(20),
    [City] VARCHAR(50),
    [Address] VARCHAR(50),
    CONSTRAINT [PK_address] PRIMARY KEY CLUSTERED ([AddressID]),
    CONSTRAINT [index_AddressID] UNIQUE NONCLUSTERED ([AddressID])
);

-- CreateTable
CREATE TABLE [dbo].[basket] (
    [BasketID] INT NOT NULL IDENTITY(1,1),
    [UserID] INT,
    [ProductID] INT,
    CONSTRAINT [PK_basket] PRIMARY KEY CLUSTERED ([BasketID]),
    CONSTRAINT [index_BasketID] UNIQUE NONCLUSTERED ([BasketID])
);

-- CreateTable
CREATE TABLE [dbo].[comments] (
    [CommentID] INT NOT NULL IDENTITY(1,1),
    [CommentProductID] INT,
    [CommentUserID] INT,
    [Comment] VARCHAR(1000),
    CONSTRAINT [PK_comments] PRIMARY KEY CLUSTERED ([CommentID]),
    CONSTRAINT [index_CommentID] UNIQUE NONCLUSTERED ([CommentID])
);

-- CreateTable
CREATE TABLE [dbo].[Favorites] (
    [FavoriteID] INT NOT NULL IDENTITY(1,1),
    [UserID] INT,
    [ProductID] INT,
    CONSTRAINT [PK_favorites] PRIMARY KEY CLUSTERED ([FavoriteID]),
    CONSTRAINT [index_FavoriteID] UNIQUE NONCLUSTERED ([FavoriteID])
);

-- CreateTable
CREATE TABLE [dbo].[orderdetails] (
    [DetailsID] INT NOT NULL IDENTITY(1,1),
    [DetailsOrderID] INT,
    [DetailsProductID] INT,
    CONSTRAINT [PK_orderdetails] PRIMARY KEY CLUSTERED ([DetailsID]),
    CONSTRAINT [index_DetailsID] UNIQUE NONCLUSTERED ([DetailsID])
);

-- CreateTable
CREATE TABLE [dbo].[orders] (
    [OrderID] INT NOT NULL IDENTITY(1,1),
    [OrderUserID] INT,
    [OrderDate] DATETIME,
    [OrderTrackingNumber] VARCHAR(30),
    [OrderAmount] FLOAT(53),
    [OrderAddressID] INT,
    [OrderStatus] TINYINT,
    CONSTRAINT [PK_orders] PRIMARY KEY CLUSTERED ([OrderID]),
    CONSTRAINT [index_OrderID] UNIQUE NONCLUSTERED ([OrderID])
);

-- CreateTable
CREATE TABLE [dbo].[productcategories] (
    [CategoryID] INT NOT NULL IDENTITY(1,1),
    [CategoryName] VARCHAR(50),
    [SubCategoryID] INT,
    CONSTRAINT [PK_productcategories] PRIMARY KEY CLUSTERED ([CategoryID]),
    CONSTRAINT [index_CategoryID] UNIQUE NONCLUSTERED ([CategoryID])
);

-- CreateTable
CREATE TABLE [dbo].[products] (
    [ProductID] INT NOT NULL IDENTITY(1,1),
    [ProductCategory] INT,
    [ProductName] VARCHAR(50),
    [ProductWeight] INT,
    [ProductShortDesc] NVARCHAR(200),
    [ProductImage] VARBINARY(max),
    [ProductStock] INT,
    [ProductPrice] FLOAT(53),
    [ProductSubCategory] INT,
    [ProductIsAvailable] BIT CONSTRAINT [DF_products_ProductIsAvailable] DEFAULT 1,
    CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED ([ProductID]),
    CONSTRAINT [index_ProductID] UNIQUE NONCLUSTERED ([ProductID])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B6108BE5BAA] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[token] (
    [UserID] INT NOT NULL,
    [refreshToken] NVARCHAR(150) NOT NULL,
    [tokenID] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [PK_token] PRIMARY KEY CLUSTERED ([tokenID])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [UserID] INT NOT NULL IDENTITY(1,1),
    [UserEmail] VARCHAR(100) NOT NULL,
    [UserPassword] VARCHAR(30) NOT NULL,
    [UserAddressID] INT,
    [UserPhone] DECIMAL(14,0),
    [Role] TINYINT NOT NULL CONSTRAINT [DefaultRole] DEFAULT 0,
    [IsActivated] BIT NOT NULL CONSTRAINT [DF_users_IsActivated] DEFAULT 0,
    [ActivationLink] VARCHAR(150) NOT NULL,
    CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([UserID]),
    CONSTRAINT [index_UserID] UNIQUE NONCLUSTERED ([UserID]),
    CONSTRAINT [UQ__users__08638DF8F78A2DE1] UNIQUE NONCLUSTERED ([UserEmail]),
    CONSTRAINT [users_ActivationLink_key] UNIQUE NONCLUSTERED ([ActivationLink])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_Address] ON [dbo].[address]([Address]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_City] ON [dbo].[address]([City]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_Country] ON [dbo].[address]([Country]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_BasketProductID] ON [dbo].[basket]([ProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_BasketUserID] ON [dbo].[basket]([UserID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_Comment] ON [dbo].[comments]([Comment]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_CommentProductID] ON [dbo].[comments]([CommentProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_CommentUserID] ON [dbo].[comments]([CommentUserID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_FK_CommentProductPK] ON [dbo].[comments]([CommentProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_FavoriteProductID] ON [dbo].[Favorites]([ProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_FavoriteUserID] ON [dbo].[Favorites]([UserID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_DetailsOrderID] ON [dbo].[orderdetails]([DetailsOrderID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_DetailsProductID] ON [dbo].[orderdetails]([DetailsProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_FK_DetailsOrderFK] ON [dbo].[orderdetails]([DetailsOrderID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_FK_DetailsProductFK] ON [dbo].[orderdetails]([DetailsProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_OrderAddressID] ON [dbo].[orders]([OrderAddressID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_OrderAmount] ON [dbo].[orders]([OrderAmount]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_OrderDate] ON [dbo].[orders]([OrderDate]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_OrderStatus] ON [dbo].[orders]([OrderStatus]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_OrderUserID] ON [dbo].[orders]([OrderUserID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_TrackingNumber] ON [dbo].[orders]([OrderTrackingNumber]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_FK_OrdersUsersFK] ON [dbo].[orders]([OrderUserID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_CategoryName] ON [dbo].[productcategories]([CategoryName]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_SubCategoryID] ON [dbo].[productcategories]([SubCategoryID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_ProductCategory] ON [dbo].[products]([ProductCategory]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_ProductName] ON [dbo].[products]([ProductName]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_ProductPrice] ON [dbo].[products]([ProductPrice]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_ProductShortDesc] ON [dbo].[products]([ProductShortDesc]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_ProductStock] ON [dbo].[products]([ProductStock]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_ProductWeight] ON [dbo].[products]([ProductWeight]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_FK_ProductCategoriesFK] ON [dbo].[products]([ProductCategory]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_UserAddressID] ON [dbo].[users]([UserAddressID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_UserEmail] ON [dbo].[users]([UserEmail]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_UserPassword] ON [dbo].[users]([UserPassword]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_UserPhone] ON [dbo].[users]([UserPhone]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [index_UserRole] ON [dbo].[users]([Role]);

-- AddForeignKey
ALTER TABLE [dbo].[basket] ADD CONSTRAINT [FK_basketProductFK] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[basket] ADD CONSTRAINT [FK_basketUserFK] FOREIGN KEY ([UserID]) REFERENCES [dbo].[users]([UserID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[comments] ADD CONSTRAINT [FK_CommentProductPK] FOREIGN KEY ([CommentProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[comments] ADD CONSTRAINT [FK_CommentUserPK] FOREIGN KEY ([CommentUserID]) REFERENCES [dbo].[users]([UserID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [FK_FavoriteProductFK] FOREIGN KEY ([ProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Favorites] ADD CONSTRAINT [FK_favoritesUserFK] FOREIGN KEY ([UserID]) REFERENCES [dbo].[users]([UserID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[orderdetails] ADD CONSTRAINT [FK_DetailsOrderFK] FOREIGN KEY ([DetailsOrderID]) REFERENCES [dbo].[orders]([OrderID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[orderdetails] ADD CONSTRAINT [FK_DetailsProductFK] FOREIGN KEY ([DetailsProductID]) REFERENCES [dbo].[products]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[orders] ADD CONSTRAINT [FK_OrdersAddressFK] FOREIGN KEY ([OrderAddressID]) REFERENCES [dbo].[address]([AddressID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[orders] ADD CONSTRAINT [FK_OrdersUsersFK] FOREIGN KEY ([OrderUserID]) REFERENCES [dbo].[users]([UserID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[productcategories] ADD CONSTRAINT [FK_SubCategoriesFK] FOREIGN KEY ([SubCategoryID]) REFERENCES [dbo].[productcategories]([CategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[products] ADD CONSTRAINT [FK_ProductCategoriesFK] FOREIGN KEY ([ProductCategory]) REFERENCES [dbo].[productcategories]([CategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[products] ADD CONSTRAINT [FK_ProductSubCategoriesFK] FOREIGN KEY ([ProductSubCategory]) REFERENCES [dbo].[productcategories]([CategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[token] ADD CONSTRAINT [FK_token_users] FOREIGN KEY ([UserID]) REFERENCES [dbo].[users]([UserID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [FK_UserAddressFK] FOREIGN KEY ([UserAddressID]) REFERENCES [dbo].[address]([AddressID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
