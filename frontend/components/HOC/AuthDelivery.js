import React, { Component, useEffect, useState } from "react";
import Router from "next/router";
import { tokenAuthenticate, isDelivery } from "../../lib/auth/auth-helpers";
import { AuthContext } from "@/lib/auth/AuthContext";
import { useContext } from "react";

const AuthDelivery = (Component) => {
  const WithAuth = (props) => {
    const { isDeliveryUser, setIsDeliveryUser, setRole } =
      useContext(AuthContext);

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return Router.push("/login");
        }

        const content = await tokenAuthenticate(token);

        if (content && content.user) {
          console.log(content.user);
          if (isDelivery(content.user)) {
            setIsDeliveryUser(true);
            setRole(content.user.role);
          } else {
            return Router.replace("/");
          }
        }
      };

      checkAuthentication();
    }, [setIsDeliveryUser]);

    if (!isDeliveryUser) {
      return <h3>You do not have permission to access this page</h3>;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};

export default AuthDelivery;
