import React from "react";
import Link from "next/link";
import LogoutButton from "../logoutButton";
import Products from "./products";

const AdminSidebar = (props) => {
  return (
    <div className="row mh-100 mw-100 " style={{ height: 100 + "vh" }}>
      <nav className="nav flex-column col-2 bg-dark ">
        <div>
          <ul>
            <Products />
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

export default AdminSidebar;
