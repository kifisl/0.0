import { useState } from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { useRouter } from "next/router";

const AddressForm = () => {
  const router = useRouter();
  const [address, setAddress] = useState({
    address: "",
    city: "",
    country: "",
  });

  const handleInputChange = (e) => {
    setAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Отправка данных о доставке на сервер для создания заказа и проведения оплаты
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order/pay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      }
    );

    if (response.ok) {
      const redirectUrl = await response.text();
      console.log(redirectUrl);
      router.push(redirectUrl);
    }

    // if (response.ok) {
    //   const data = await response.json();
    //   const redirectUrl = await data.redirectUrl;
    //   console.log(redirectUrl);
    //   router.push(redirectUrl);
    // }
  };

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 100 + "%",
          maxWidth: 500 + "px",
          margin: 0 + " auto",
          padding: 15 + "px",
        }}
      >
        <h1>Address</h1>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          value={address.address}
          onChange={handleInputChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={address.city}
          onChange={handleInputChange}
        />
        <label htmlFor="country">Country</label>
        <input
          className="form-control"
          type="text"
          id="country"
          name="country"
          value={address.country}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-info">
          Pay
        </button>
      </form>
    </DefaultLayout>
  );
};

export default AddressForm;
