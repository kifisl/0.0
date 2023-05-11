import React from "react";
import styles from "../styles/Order.module.css";

const Basket = (props)=>{
    return(
        <div key={props.id} className={styles.order}>
        <p>Order id: {props.id}</p>
        {props.status == "Complete" ? (
          <p>
            Order status:
            <span className="text-success"> {props.status}</span>
          </p>
        ) : (
          <p>
            Order status:
            <span className="text-danger"> {props.status}</span>
          </p>
        )}
        <div className="d-flex">{props.children}</div>
      </div>
    )
}