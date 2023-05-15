import { useState } from "react";
import AdminSidebar from "@/components/admin_components/adminSidebar";

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [short_desc, setDesc] = useState("");
  const [img, setImage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("Вы не авторизованы");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("short_desc", short_desc);
    let imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append("file", imagedata);

    const boundary = Math.random().toString().substr(2);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    };

    const request = await fetch("/v1/product/add", {
      method: "POST",
      headers: headers,
      body: formData,
    });

    const content = await request.json();
    if (content.error) {
      return alert("Wrong data");
    }
    return alert("Part added");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <AdminSidebar>
      <div className="d-flex justify-content-center">
        <form onSubmit={submit} encType="multipart/form-data">
          <h1>Add product</h1>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className="form-control"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            name="price"
            className="form-control"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="weight">Weight</label>
          <input
            name="weight"
            className="form-control"
            required
            onChange={(e) => setWeight(e.target.value)}
          />
          <label htmlFor="short_desc">Description</label>
          <input
            name="short_desc"
            className="form-control"
            required
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="img">Image</label>
          <input type="file" name="file" className="form-control" required />
          <button type="submit" className="btn btn-info">
            Add part
          </button>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default Add;
