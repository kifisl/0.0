import React from "react";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../styles/Product.module.css";

const BasketItem = (props) => {
  return (
    <div key={props.products.ProductID} className={styles.product}>
      <h3>{props.products.ProductName}</h3>
      <p>Price: {props.products.ProductPrice} BYN</p>
      <p>Quantity: {props.Quantity}</p>
      <div className="d-flex">
        <br />
        <button
          className={styles.product_button}
          onClick={() => props.removeItem(props.BasketProductID)}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
