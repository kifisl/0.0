import React from "react";
import Link from "next/link";
import styles from "../styles/Product.module.css";

const OrderItem = (props) => {
  let status;
  if (props.OrderStatus === 1) {
    status = "accepted";
  } else if (props.OrderStatus === 2) {
    status = "on the way";
  } else if (props.OrderStatus === 3) {
    status = "delivered";
  }
  return (
    <div key={props.OrderID} className={styles.product}>
      <h3><strong>ID:</strong> {props.OrderID}</h3>
      <p><strong>Date & Time: </strong>{props.OrderDate}</p>
      <p>
      <strong>Address:</strong> {props.address.Country}, {props.address.City},{" "}
        {props.address.Address}
      </p>
      <div>
      <strong>Product - quantity:</strong>{" "}
        <div>
          {props.orderdetails.map((detail) => (
            <div key={`${detail.products.ProductName}-${detail.Quantity}`}>
              {detail.products.ProductName} - {detail.Quantity}
            </div>
          ))}
        </div>
      </div>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};
export default OrderItem;
