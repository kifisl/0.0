import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Product.module.css";
import Unauthlinks from "../unauthLinks";
import LogoutButton from "../logoutButton";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AuthContext } from "@/lib/auth/AuthContext";
import { useContext } from "react";

let auth = false;

const DefaultLayout = (props) => {
  //const [message, setMessage] = useState("");
  const { authenticated, setAuthenticated, role, setRole } =
    useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    router.push(`/search?query=${searchQuery}`);
  };

  useEffect(() => {
    (async () => {
      if (auth) return;
      auth = true;
      const response = await fetch("/v1/auth/refresh", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const content = await response.json();
      if (content.user) {
        setRole(content.user.role);
        return setAuthenticated(true);
      } else {
        return setAuthenticated(false);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Paradise</title>
      </Head>

      {/* <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link legacyBehavior href="/">
            <img
              src={"http://localhost:5000/PARADISE_2.png"}
              alt="PARADISE"
              className={styles.logoimg}
            />
          </Link>
          <div className="d-flex align-items-center mx-auto">
            <input
              className="form-control custom-search-input"
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-light custom-search-button"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>

          <div>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {!authenticated ? (
                <Unauthlinks />
              ) : (
                <>
                  {" "}
                  <Link legacyBehavior href={`/basket`}>
                    <button className="btn btn-outline-light my-2 my-sm-0">
                      basket
                    </button>
                  </Link>
                  <LogoutButton />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav> */}

      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src={"http://localhost:5000/PARADISE_2.png"}
                alt="PARADISE"
                className={styles.logoimg}
              />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              {!authenticated ? (
                <></>
              ) : (
                <>
                  <li>
                    <a href="/basket" className="nav-link px-2 text-white">
                      Basket
                    </a>
                  </li>
                  <li>
                    <a href="/orders" className="nav-link px-2 text-white">
                      Orders
                    </a>
                  </li>
                </>
              )}
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <div className="d-flex">
                <input
                  type="search"
                  className="form-control form-control-dark"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="btn btn-outline-light me-2"
                  onClick={handleSearch}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            <div class="text-end">
              {!authenticated ? (
                <Unauthlinks />
              ) : (
                <>
                  <LogoutButton />
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">{props.children}</div>
      </main>
    </>
  );
};

export default DefaultLayout;
