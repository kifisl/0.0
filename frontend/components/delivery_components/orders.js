import React from "react";
import Link from "next/link";

const Orders = () => {
  return (
    <>
      <li className="nav-item">
        <Link legacyBehavior href="/delivery/orders">
          <a className="nav-link activate text-light">Orders</a>
        </Link>
      </li>
    </>
  );
};

export default Orders;
