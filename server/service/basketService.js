const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class BasketService {
  async recountPrice(basketID) {
    const currentBasket = await conn.basket.findFirst({
      where: {
        BasketID: Number.parseInt(basketID),
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
    let i;
    for (i = 0; i < currentBasket.basketproduct.length; i++) {
      newPrice +=
        currentBasket.basketproduct[i].products.ProductPrice *
        currentBasket.basketproduct[i].Quantity;
    }

    const updatedBasket = await conn.basket.update({
      where: {
        BasketID: Number.parseInt(basketID),
      },
      data: {
        BasketAmount: newPrice,
      },
    });
    return updatedBasket;
  }
}

module.exports = new BasketService();
