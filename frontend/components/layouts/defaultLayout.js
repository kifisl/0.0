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

  const router = useRouter();

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
      if (content.user) {
        //setMessage(content.user.email);
        setRole(content.user.role);
        console.log("true");
        return setAuthenticated(true);
      }
      setAuthenticated(false);
      console.log("false");
    })();
  });

  return (
    <>
      <Head>
        <title>Local Travel</title>
      </Head>

      <nav className="navbar navbar-expand-md navbar-dark mb-4 bgprime">
        <div className="container-fluid">
          <Link legacyBehavior href="/">
            <a className="navbar-brand">Home</a>
          </Link>
          <Link legacyBehavior href={`/basket`}>
            <button>basket</button>
          </Link>

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
