import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Product from "@/components/products";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { Row } from "react-bootstrap";
import Link from "next/link";

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
  return (
    <DefaultLayout>
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
