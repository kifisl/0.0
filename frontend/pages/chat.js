import React from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import AuthUser from "@/components/HOC/AuthUser";
import styles from "../styles/Product.module.css";
import WebSock from "@/components/webSocket";

const Chat = () => {
  let user = "USER";
  return (
    <DefaultLayout>
      <WebSock username={user} />
    </DefaultLayout>
  );
};

export default AuthUser(Chat);
