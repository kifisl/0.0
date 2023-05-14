import React from "react";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import styles from "../styles/Product.module.css";

const Product = (props) => {
  const {
    ProductID,
    ProductName,
    ProductPrice,
    ProductWeight,
    ProductShortDesc,
    ProductImage,
  } = props;

  async function addToBucket(productID) {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          productID: productID,
        }),
      }
    );
    if (request.ok) {
      return alert("Product has been added to basket");
    }
  }

  return (
    <div key={ProductID} className={styles.product}>
      <h3>{ProductName}</h3>
      <Image
        width={200}
        height={133}
        src={"http://localhost:5000/" + ProductImage}
      />
      <p>Price: {ProductPrice}$</p>
      <p>Weight: {ProductWeight}</p>
      <p>Description: {ProductShortDesc}</p>
      <div>
        <Link href={`/product/${ProductID}`}>
          <button className={styles.product_button}>More</button>
        </Link>
        <br />
        <button
          onClick={() => addToBucket(ProductID)}
          className={styles.product_button}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
