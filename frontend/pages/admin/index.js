import React from "react";
import AdminSidebar from "@/components/admin_components/adminSidebar";
import Adminlayout from "@/components/layouts/adminLayout";
import AuthAdmin from "@/components/HOC/AuthAdmin";

const Index = () => {
  return (
    <AdminSidebar>
      <h2>Hello ADMIN</h2>
    </AdminSidebar>
  );
};

export default AuthAdmin(Index);
