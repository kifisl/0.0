require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const createOrder = async (req, res) => {
  const userId = req.cookies.userID; // Получение ID пользователя из сессии
  const { address } = req.body; // Получение данных о доставке из формы

  try {
    // Получение корзины пользователя
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
        currency: "byn", // Валюта товара
        product_data: {
          name: basketProduct.products.ProductName, // Название товара
        },
        unit_amount: Math.round(basketProduct.products.ProductPrice * 100), // Цена товара в центах
      },
      quantity: basketProduct.Quantity, // Количество товара
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/api/payment/stripe-payment-success/", // URL страницы после успешной оплаты
      cancel_url: "http://localhost:3000/api/payment/stripe-payment-cancel/", // URL страницы после отмены оплаты
    });

    const addressNew = await conn.address.create({
      data: {
        Address: address.address,
        Country: address.country,
        City: address.city,
      },
    });

    // Создание заказа в базе данных
    const order = await conn.orders.create({
      data: {
        OrderUserID: Number.parseInt(userId),
        OrderDate: new Date(),
        OrderAmount: userBasket.BasketAmount,
        OrderAddressID: addressNew.AddressID, // Предполагается, что у вас есть ID адреса доставки в таблице address
        OrderStatus: 1, // Предполагается, что значение 1 означает "Активен"
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

    // Удаление корзины пользователя после успешного заказа
    await conn.basket.delete({
      where: {
        BasketID: userBasket.BasketID,
      },
    });

    // Возвращаем ответ клиенту
    //return session.url;
    // res.redirect(303, session.url);
    console.log(session.url);
    res.send(session.url);
  } catch (error) {
    console.error("Error creating order:", error);
    res.json({ success: false, error: "Failed to create order" });
  }
};

module.exports = {
  createOrder,
};
