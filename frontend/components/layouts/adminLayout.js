import React from "react";
import AdminSidebar from "@/components/admin_components/adminSidebar";

const Adminlayout = (props) => {
  return (
    <div className="row mw-100">
      <div className="col-2">
        <AdminSidebar></AdminSidebar>
      </div>
      <main className="col-9">
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Adminlayout;
