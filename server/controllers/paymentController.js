require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const createOrder = async (req, res) => {
  const userId = req.cookies.userID;
  const { address } = req.body;

  try {
    const userBasket = await conn.basket.findFirst({
      where: {
        UserID: Number.parseInt(userId),
      },
      include: {
        basketproduct: {
          include: {
            products: true,
          },
        },
      },
    });

    const lineItems = userBasket.basketproduct.map((basketProduct) => ({
      price_data: {
        currency: "byn",
        product_data: {
          name: basketProduct.products.ProductName,
        },
        unit_amount: Math.round(basketProduct.products.ProductPrice * 100),
      },
      quantity: basketProduct.Quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/orders", // URL страницы после успешной оплаты
      cancel_url: "http://localhost:5000/api/order/deleteRedirect", // URL страницы после отмены оплаты
    });

    const addressNew = await conn.address.create({
      data: {
        Address: address.address,
        Country: address.country,
        City: address.city,
      },
    });

    const order = await conn.orders.create({
      data: {
        OrderUserID: Number.parseInt(userId),
        OrderDate: new Date(),
        OrderAmount: userBasket.BasketAmount,
        OrderAddressID: addressNew.AddressID,
        OrderStatus: 1,
        orderdetails: {
          createMany: {
            data: userBasket.basketproduct.map((item) => ({
              DetailsProductID: item.ProductID,
              Quantity: item.Quantity,
            })),
          },
        },
      },
      include: {
        address: true,
      },
    });

    await conn.basketproduct.deleteMany({
      where: {
        BasketID: userBasket.BasketID,
      },
    });

    await conn.basket.delete({
      where: {
        BasketID: userBasket.BasketID,
      },
    });

    res.send(session.url);
  } catch (error) {
    console.error("Error creating order:", error);
    res.json({ success: false, error: "Failed to create order" });
  }
};

module.exports = {
  createOrder,
};
