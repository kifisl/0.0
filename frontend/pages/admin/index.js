import React from "react";
import AdminSidebar from "@/components/admin_components/adminSidebar";
import Adminlayout from "@/components/layouts/adminLayout";
import AuthAdmin from "@/components/HOC/AuthAdmin";
import styles from "../../styles/Product.module.css";

const Index = () => {
  return (
    <AdminSidebar>
      <div className={styles.mainpage}></div>
    </AdminSidebar>
  );
};

export default AuthAdmin(Index);
