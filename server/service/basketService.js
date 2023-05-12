const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class BasketService {
  async userBasket(userID) {
    const currentBasket = await conn.basket.findFirst({
      where: {
        UserID: Number.parseInt(userID),
      },
    });
    return currentBasket;
  }
  async recountPrice(userID) {
    const currentBasket = await conn.basket.findFirst({
      where: {
        UserID: Number.parseInt(userID),
      },
      include: {
        basketproduct: {
          // select: {
          //   ProductID: true,
          //   Quantity: true,
          // },
          include: {
            products: {
              select: {
                ProductPrice: true,
              },
            },
          },
        },
      },
    });
    let newPrice = 0;
    if (currentBasket.basketproduct != null) {
      let i;
      for (i = 0; i < currentBasket.basketproduct.length; i++) {
        newPrice +=
          currentBasket.basketproduct[i].products.ProductPrice *
          currentBasket.basketproduct[i].Quantity;
      }
    }

    const updatedBasket = await conn.basket.update({
      where: {
        BasketID: Number.parseInt(currentBasket.BasketID),
      },
      data: {
        BasketAmount: newPrice,
      },
    });
    return updatedBasket;
  }
}

module.exports = new BasketService();
