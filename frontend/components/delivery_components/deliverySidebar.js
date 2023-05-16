import React from "react";
import Link from "next/link";
import LogoutButton from "../logoutButton";
import Orders from "./orders";

const DeliverySidebar = (props) => {
  return (
    <div className="row mh-100 mw-100 " style={{ height: 100 + "vh" }}>
      <nav className="nav flex-column col-2 bg-dark ">
        <div>
          <ul>
            <Link legacyBehavior href="/delivery">
              <a className="nav-link activate text-light">Home</a>
            </Link>
          </ul>
          <ul>
            <Orders />
          </ul>
          <div className="d-flex justify-content-center">
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="col-10">
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default DeliverySidebar;
