import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Product from "@/components/products";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { Row } from "react-bootstrap";
import Basket from "@/components/Basket";
import BasketItem from "@/components/BasketItems";

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
  // const [message, setMessage] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);
  // const [role, setRole] = useState("");

  // const router = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("/v1/auth/refresh", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const content = await response.json();
  //     if (content.user) {
  //       setMessage(content.user.email);
  //       setRole(content.user.role);
  //       console.log("true");
  //       return setAuthenticated(true);
  //     }
  //     setAuthenticated(false);
  //     console.log("false");
  //   })();
  // });

  async function basketToOrder(id) {
    const newOrder = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket/basketToOrder`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          Cookie: ctx.req.headers.cookie,
        },
      }
    );
  }

  return (
    <DefaultLayout>
      <div>{JSON.stringify(data)}</div>
      <div>
        {data.basketItems.map((item, i) => {
          return <BasketItem {...item} key={i} />;
        })}
      </div>
      <div>{basketJson.basket.BasketAmount}</div>
    </DefaultLayout>
  );
};

export default Index;
