import React from "react";
import Link from "next/link";

const Products = () => {
  return (
    <>
      <li className="nav-item">
        <Link legacyBehavior href="/admin/products">
          <a className="nav-link activate text-light">Products</a>
        </Link>
      </li>
    </>
  );
};

export default Products;
