import React, { useState } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "@/components/admin_components/adminSidebar";
import AuthAdmin from "@/components/HOC/AuthAdmin";

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product/getById`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: context.query.id,
      }),
    }
  );
  const content = await response.json();

  return {
    props: { data: content },
  };
};

const Edit = ({ data }) => {
  const [updateName, setUpdateName] = useState(data.product.ProductName);
  const [updatePrice, setUpdatePrice] = useState(data.product.ProductPrice);
  const [update_desc, setUpdateDesc] = useState(data.product.ProductShortDesc);
  const [updateWeight, setUpdateWeight] = useState(data.product.ProductWeight);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    const id = data.product.ProductID;
    formData.append("id", id);
    formData.append("updateName", updateName);
    formData.append("updatePrice", updatePrice);
    formData.append("update_desc", update_desc);
    formData.append("updateWeight", updateWeight);
    let imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append("file", imagedata);

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product/edit`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (request.ok) {
      await router.push("/admin/products");
      return alert("Product has been updated");
    }
    return alert("Wrong data");
  };

  return (
    <AdminSidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit} encType={"multi/form-data"} id="formEl">
          <h1>Update product</h1>
          <label htmlFor="updateName">Name</label>
          <input
            value={updateName}
            name="updateName"
            className="form-control"
            required
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <label htmlFor="updatePrice">Price</label>
          <input
            value={updatePrice}
            name="updatePrice"
            className="form-control"
            required
            onChange={(e) => setUpdatePrice(e.target.value)}
          />
          <label htmlFor="update_desc">Description</label>
          <input
            value={update_desc}
            name="update_desc"
            className="form-control"
            required
            onChange={(e) => setUpdateDesc(e.target.value)}
          />
          <label htmlFor="updateWeight">Weight</label>
          <input
            value={updateWeight}
            name="updateWeight"
            className="form-control"
            required
            onChange={(e) => setUpdateWeight(e.target.value)}
          />

          <div
            className="d-block"
            style={{
              padding: 15 + "px",
            }}
          >
            <img
              src={"http://localhost:5000/" + data.product.ProductImage}
              width={200}
              height={100}
            />
          </div>
          <div className="d-block">
            <input type="file" name="file" className="form-control" />
          </div>
          <div
            className="d-block"
            style={{
              padding: 15 + "px",
            }}
          >
            <button type="submit" className="btn btn-info">
              update
            </button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default Edit;
