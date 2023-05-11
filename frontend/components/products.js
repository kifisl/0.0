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
  return (
    <div key={ProductID} className={styles.product}>
      <h3>{ProductName}</h3>
      <Image
        width={200}
        height={133}
        src={process.env.SERVER_DOMAIN + ProductImage}
      />
      <p>Price: {ProductPrice}$</p>
      <p>Weight: {ProductWeight}</p>
      <p>Description: {ProductShortDesc}</p>
      <div>
        <Link href={`/product/${ProductID}`}>
          <button className={styles.product_button}>More</button>
        </Link>
        <br />
        <button className={styles.product_button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
