import React from "react";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../styles/Product.module.css";

const BasketItem = (props) => {
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
    const content = await removed.json();
    return content;
  }

  return (
    <div key={props.products.ProductID} className={styles.product}>
      <h3>{props.products.ProductName}</h3>
      <p>Price: {props.products.ProductPrice} BYN</p>
      <div className="d-flex">
        <br />
        <button
          className={styles.product_button}
          onClick={() => removeItemFromBasket(props.BasketProductID)}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
