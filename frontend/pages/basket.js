import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Product from "@/components/products";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { Row } from "react-bootstrap";
import BasketItem from "@/components/basketItems";
import Link from "next/link";
import AuthUser from "@/components/HOC/AuthUser";
import styles from "../styles/Product.module.css";

export const getServerSideProps = async (ctx) => {
  const basketItems = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Cookie: ctx.req.headers.cookie,
      },
    }
  );

  const basket = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket/get`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Cookie: ctx.req.headers.cookie,
      },
    }
  );
  const content = await basketItems.json();
  const userBasket = await basket.json();
  return {
    props: { data: content, basketJson: userBasket },
  };
};

const Index = ({ data, basketJson }) => {
  const [basketAmount, setBasketAmount] = useState(
    basketJson.basket.BasketAmount
  );
  const [basketItems, setBasketItems] = useState([]);

  const updateBasketAmount = (newAmount) => {
    setBasketAmount(newAmount);
  };

  useEffect(() => {
    setBasketItems(data.basketItems);
  }, [data.basketItems]);

  async function updateBasket() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket/get`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    const json = await response.json();
    setBasketItems(json.data.basketItems);
    setBasketAmount(json.data.basket.BasketAmount);
  }

  async function removeItemFromBasket(id) {
    const removed = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );

    const updatedBasket = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket/get`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    const json = await updatedBasket.json();
    const updatedBasketAmount = json.basket.BasketAmount;
    updateBasketAmount(updatedBasketAmount);

    const updatedBasketItems = json.basket.basketproduct;
    const itemExists = updatedBasketItems.some(
      (item) => item.BasketProductID === id
    );

    if (!itemExists) {
      // Товар был удален на сервере, удаляем его из списка basketItems
      setBasketItems((prevItems) =>
        prevItems.filter((item) => item.BasketProductID !== id)
      );
    } else {
      // Обновляем значение Quantity для соответствующего товара
      setBasketItems((prevItems) =>
        prevItems.map((item) => {
          if (item.BasketProductID === id) {
            const updatedItem = updatedBasketItems.find(
              (updatedItem) => updatedItem.BasketProductID === id
            );
            return { ...item, Quantity: updatedItem.Quantity };
          }
          return item;
        })
      );
    }
  }

  return (
    <DefaultLayout>
      {basketItems.length === 0 ? (
        <div className={styles.empty_basket}>
          <h3>Your basket is empty</h3>
        </div>
      ) : (
        <>
          <div>
            {basketItems.map((item, i) => {
              return (
                <BasketItem
                  {...item}
                  key={i}
                  removeItem={removeItemFromBasket}
                />
              );
            })}
          </div>

          <h3>Total: {basketAmount} BYN</h3>
          <Link legacyBehavior href="/address">
            <button className={styles.product_button}>Pay for order</button>
          </Link>
        </>
      )}
    </DefaultLayout>
  );
};

export default AuthUser(Index);
