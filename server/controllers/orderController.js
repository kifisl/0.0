const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const paymentService = require("./paymentController");

class orderController {
  async getUserOrders(req, res) {
    try {
      let userID = req.cookies.userID;
      const userOrders = await conn.orders.findMany({
        where: {
          OrderUserID: Number.parseInt(userID),
        },
        include: {
          orderdetails: {
            select: {
              Quantity: true,
              products: {
                select: {
                  ProductName: true,
                  ProductPrice: true,
                },
              },
            },
          },
          address: {
            select: {
              Country: true,
              City: true,
              Address: true,
            },
          },
        },
      });
      return res.status(200).json({ userOrders });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const allOrders = await conn.orders.findMany({
        include: {
          orderdetails: {
            select: {
              Quantity: true,
              products: {
                select: {
                  ProductName: true,
                  ProductPrice: true,
                },
              },
            },
          },
          address: {
            select: {
              Country: true,
              City: true,
              Address: true,
            },
          },
        },
      });

      res.status(200).json({ allOrders });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async changeStatus(req, res) {
    try {
      let orderID = req.params.orderID;
      let status = req.params.status;
      const updOrder = await conn.orders.update({
        where: {
          OrderID: Number.parseInt(orderID),
        },
        data: {
          OrderStatus: Number.parseInt(status),
        },
      });
      await res.status(200).json({ updOrder });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteAndRedirect(req, res) {
    try {
      const lastOrder = await conn.orders.findMany({
        orderBy: { OrderID: "desc" },
        take: 1,
      });

      const deleteDetails = await conn.orderdetails.deleteMany({
        where: { DetailsOrderID: lastOrder[0].OrderID },
      });

      const deleteOrder = await conn.orders.delete({
        where: {
          OrderID: lastOrder[0].OrderID,
        },
      });

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getOrderByID(req, res) {
    try {
      let orderID = req.body.id;
      const order = await conn.orders.findFirst({
        where: {
          OrderID: Number.parseInt(orderID),
        },
        include: {
          orderdetails: {
            select: {
              Quantity: true,
              products: {
                select: {
                  ProductName: true,
                  ProductPrice: true,
                },
              },
            },
          },
          address: {
            select: {
              Country: true,
              City: true,
              Address: true,
            },
          },
        },
      });

      res.status(200).json({ order });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async payForOrder(req, res) {
    let basketID = req.params.basketID;
    let userID = req.cookies.userID;
    const paymentRedirect = await paymentService.createCheckoutSession(
      basketID,
      userID
    );
    res.send(paymentRedirect);
  }
}

module.exports = new orderController();
