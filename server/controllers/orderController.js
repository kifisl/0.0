const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

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
      res.status(200).json({ updOrder });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getOrderByID(req, res) {
    try {
      let orderID = req.params.orderID;
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
        },
      });

      res.status(200).json({ order });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async payForOrder(req, res) {
    try {
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = new orderController();
