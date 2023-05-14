import React from "react";
import Link from "next/link";
import Head from "next/head";
import Unauthlinks from "../unauthLinks";
import LogoutButton from "../logoutButton";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const DefaultLayout = (props) => {
  //const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    router.push(`/search?query=${searchQuery}`);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/v1/auth/refresh", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const content = await response.json();
      console.log(content.user);
      if (content.user) {
        //setMessage(content.user.email);
        setRole(content.user.role);
        return setAuthenticated(true);
      } else {
        return setAuthenticated(false);
      }
    })();
  });

  return (
    <>
      <Head>
        <title>Local Travel</title>
      </Head>

      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link legacyBehavior href="/">
            <a className="navbar-brand">Home</a>
          </Link>

          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            class="btn btn-outline-light my-2 my-sm-0"
            onClick={handleSearch}
          >
            Search
          </button>

          <div>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {!authenticated ? <Unauthlinks /> : <LogoutButton />}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">{props.children}</div>
      </main>
    </>
  );
};

export default DefaultLayout;
