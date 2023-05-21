import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "@/components/admin_components/adminSidebar";
import AuthAdmin from "@/components/HOC/AuthAdmin";

const Add = () => {
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("Вы не авторизованы");
    }

    const request = await fetch("/v1/product/add", {
      method: "POST",
      headers: {},
      body: new FormData(formEl),
    });

    const content = await request.json();
    if (request.ok) {
      await router.push("/admin/products");
      return alert("Product has been added");
    }
    return alert("Wrong data");
  };

  return (
    <AdminSidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit} encType="multi/form-data" id="formEl">
          <h1>Add product</h1>
          <label htmlFor="name">Name</label>
          <input name="name" className="form-control" required />
          <label htmlFor="price">Price</label>
          <input name="price" className="form-control" required />
          <label htmlFor="weight">Weight</label>
          <input name="weight" className="form-control" required />
          <label htmlFor="short_desc">Description</label>
          <input name="short_desc" className="form-control" required />
          <label htmlFor="img">Image</label>
          <input
            type="file"
            name="file"
            className="form-control"
            required
            accept="image/*"
          />
          <button type="submit" className="btn btn-info">
            Add product
          </button>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default AuthAdmin(Add);
