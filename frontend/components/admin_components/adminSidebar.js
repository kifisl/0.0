import React from "react";
import Link from "next/link";
import LogoutButton from "../logoutButton";
import Products from "./products";
import Head from "next/head";
import styles from "../../styles/Product.module.css";

const AdminSidebar = (props) => {
  return (
    <>
      <Head>
        <title>Paradise Admin </title>
      </Head>
      <div className="row mh-100 mw-100 " style={{ height: 100 + "vh" }}>
        <nav className="nav flex-column col-2 bg-dark ">
          <div>
            <a href="/admin" className="d-flex justify-content-center">
              <img
                src={"http://localhost:5000/PARADISE_2.png"}
                alt="PARADISE"
                className={styles.logoimg}
              />
            </a>
            <ul>
              <Link legacyBehavior href="/admin">
                <a className="nav-link activate text-light">Home</a>
              </Link>
            </ul>
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
    </>
  );
};

export default AdminSidebar;
