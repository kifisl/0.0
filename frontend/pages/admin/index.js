import React from "react";
import AdminSidebar from "@/components/admin_components/adminSidebar";
import AuthAdmin from "@/components/HOC/AuthAdmin";
import styles from "../../styles/Product.module.css";
import WebSock from "@/components/webSocket";

const Index = () => {
  return (
    <AdminSidebar>
      <WebSock role={1} />
    </AdminSidebar>
  );
};

export default AuthAdmin(Index);
