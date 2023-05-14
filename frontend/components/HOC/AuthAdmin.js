import React, { useEffect, useState } from "react";
import Router from "next/router";
import { tokenAuthenticate, isAdmin } from "../../lib/auth/auth-helpers";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const AuthAdmin = (Component) => {
  const WithAuth = (props) => {
    const { isAdminUser, setIsAdminUser } = useContext(AuthContext);

    useEffect(() => {
      const checkAuthentication = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return Router.push("/login");
        }

        const content = await tokenAuthenticate(token);

        if (content && content.user) {
          console.log(content.user);
          if (isAdmin(content.user)) {
            setIsAdminUser(true);
          } else {
            return Router.replace("/");
          }
        }
      };

      checkAuthentication();
    }, [setIsAdminUser]);

    if (!isAdminUser) {
      return <h3>У вас нет прав для доступа к этой странице</h3>; // Отображение сообщения об отсутствии прав доступа
    }

    return <Component {...props} />; // Рендеринг компонента, если есть права доступа
  };

  return WithAuth;
};

export default AuthAdmin;
