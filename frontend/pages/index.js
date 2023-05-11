import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Product from "@/components/products";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { Row } from "react-bootstrap";

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product/getPag`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offset: 0,
        take: 3,
      }),
    }
  );
  const content = await response.json();
  return {
    props: { data: content },
  };
};

export default function Home({ data }) {
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch("/v1/auth/refresh", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const content = await response.json();
      if (content.user) {
        setMessage(content.user.email);
        setRole(content.user.role);
        console.log("true");
        return setAuthenticated(true);
      }
      setAuthenticated(false);
      console.log("false");
    })();
  });

  return (
    <DefaultLayout auth={authenticated} role={role}>
      <Row>
        <div className="d-flex">
          {data.result.map((obj, i) => (
            <Product {...obj} key={i} />
          ))}
        </div>
      </Row>
    </DefaultLayout>
  );
}
