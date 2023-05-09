const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const basketService = require("../service/basketService");

class basketController {
  async addProductToBasket(req, res) {
    try {
      let { productID } = req.body;
      let userID = req.cookies.userID;

      if (!req.cookies.basketID) {
        const newBasket = await conn.basket.create({
          data: {
            UserID: Number.parseInt(userID),
            BasketAmount: 0,
          },
        });

        let basketCookie = newBasket.BasketID;
        const basketItem = await conn.basketproduct.create({
          data: {
            BasketID: basketCookie,
            ProductID: Number.parseInt(productID),
            Quantity: 1,
          },
        });

        const productInBasket = await conn.products.findFirst({
          where: {
            ProductID: basketItem.ProductID,
          },
        });

        const basketUpdatePrice = await conn.basket.update({
          where: {
            BasketID: newBasket.BasketID,
          },
          data: {
            BasketAmount: productInBasket.ProductPrice,
          },
        });

        res.cookie("basketID", basketCookie);
        return res.status(200).json({ basketItem });
      }
      //END IF

      let bsktID = req.cookies.basketID;
      const basketExist = await conn.basketproduct.findFirst({
        where: {
          ProductID: Number.parseInt(productID),
          BasketID: Number.parseInt(bsktID),
        },
      });

      if (basketExist) {
        const updatedBasketIncr = await conn.basketproduct.update({
          where: {
            BasketProductID: basketExist.BasketProductID,
          },
          data: {
            Quantity: {
              increment: 1,
            },
          },
        });

        const basketProductExists = await conn.products.findFirst({
          where: {
            ProductID: basketExist.ProductID,
          },
        });

        const UpdatedAmount = await conn.basket.update({
          where: {
            BasketID: Number.parseInt(bsktID),
          },
          data: {
            BasketAmount: {
              increment: basketProductExists.ProductPrice,
            },
          },
        });

        return res.status(200).json({ UpdatedAmount });
      } else {
        const basketItemNew = await conn.basketproduct.create({
          data: {
            ProductID: Number.parseInt(productID),
            BasketID: Number.parseInt(bsktID),
          },
        });

        const productInBasketExist = await conn.products.findFirst({
          where: {
            ProductID: basketItemNew.ProductID,
          },
        });

        const basketUpdatedAmount = await conn.basket.update({
          where: {
            BasketID: Number.parseInt(bsktID),
          },
          data: {
            BasketAmount: {
              increment: productInBasketExist.ProductPrice,
            },
          },
        });
        return res.status(200).json({ basketUpdatedAmount });
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getProductsInBasket(req, res) {
    try {
      let userID = req.cookies.userID;

      const currentBasket = await conn.basket.findFirst({
        where: {
          UserID: Number.parseInt(userID),
        },
      });
      console.log(currentBasket.BasketID);
      const basketItems = await conn.basketproduct.findMany({
        where: {
          BasketID: currentBasket.BasketID,
        },
        include: {
          products: {
            select: {
              ProductName: true,
            },
          },
        },
      });
      return res.status(200).json({ basketItems });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async removeItemFromBasket(req, res) {
    try {
      let { id } = req.body;
      let deleted = {};
      const basketproduct = await conn.basketproduct.findFirst({
        where: {
          BasketProductID: Number.parseInt(id),
        },
      });

      if (basketproduct.Quantity > 1) {
        deleted = await conn.basketproduct.update({
          where: {
            BasketProductID: basketproduct.BasketProductID,
          },
          data: {
            Quantity: {
              decrement: 1,
            },
          },
        });
        let result = basketService.recountPrice(basketproduct.BasketID);
        return res.status(200).json({ result });
      } else {
        deleted = await conn.basketproduct.delete({
          where: {
            BasketProductID: basketproduct.BasketProductID,
          },
        });

        let result = basketService.recountPrice(basketproduct.BasketID);
        return res.status(200).json({ result });
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async CreateOrder(req, res) {
    try {
      let userID = req.cookies.userID;
      let time = new Date();
      const currentBasket = await conn.basket.findFirst({
        where: {
          UserID: Number.parseInt(userID),
        },
        include: {
          basketproduct: {
            select: {
              ProductID: true,
              Quantity: true,
            },
          },
        },
      });

      const newOrder = await conn.orders.create({
        data: {
          OrderUserID: Number.parseInt(userID),
          OrderDate: new Date(),
          OrderAmount: currentBasket.BasketAmount,
        },
      });

      let i;
      for (i = 0; i < currentBasket.basketproduct.length; i++) {
        await conn.orderdetails.create({
          data: {
            DetailsProductID: currentBasket.basketproduct[i].ProductID,
            DetailsOrderID: newOrder.OrderID,
            Quantity: currentBasket.basketproduct[i].Quantity,
          },
        });
      }
      await conn.basketproduct.deleteMany({
        where: {
          BasketID: currentBasket.BasketID,
        },
      });

      await conn.basket.deleteMany({
        where: {
          BasketID: currentBasket.BasketID,
        },
      });
      res.clearCookie("basketID");

      return res.status(200).json({ newOrder });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = new basketController();
