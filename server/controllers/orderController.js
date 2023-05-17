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

  async webhook(req, res) {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            paymentService.createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
}

module.exports = new orderController();
