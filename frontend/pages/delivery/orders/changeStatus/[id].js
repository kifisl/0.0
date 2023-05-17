import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsPencil } from "react-icons/bs";
import DeliverySidebar from "@/components/delivery_components/deliverySidebar";

export const getServerSideProps = async (context) => {
  let id = context.query.id;
  console.log("ID" + id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order/getByID`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }
  );
  const content = await response.json();

  return {
    props: { data: content },
  };
};

const ChangeStatus = ({ data }) => {
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  let statusOld;
  if (data.order.OrderStatus === 1) {
    statusOld = "accepted";
  } else if (data.order.OrderStatus === 2) {
    statusOld = "on the way";
  } else if (data.order.OrderStatus === 3) {
    statusOld = "delivered";
  }
  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let statusNew;
      if (status === "accepted") {
        statusNew = 1;
      } else if (status === "on the way") {
        statusNew = 2;
      } else if (status === "delivered") {
        statusNew = 3;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order/delivery/${data.order.OrderID}/${statusNew}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setSuccessMessage("Status successfully updated");
        router.push("/delivery/orders");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <DeliverySidebar>
      <div className="container">
        <div className="info-block">
          <h3>
            <strong>Order ID: </strong>
            {data.order.OrderID}
          </h3>
          <p>
            <strong>Date & Time:</strong> {data.order.OrderDate}
          </p>
          <p>
            <strong>Address: </strong>
            {data.order.address.Country}, {data.order.address.City},{" "}
            {data.order.address.Address}
          </p>
          <div>
            <strong>Product - quantity:</strong>{" "}
            <div>
              {data.order.orderdetails.map((detail) => (
                <div key={`${detail.products.ProductName}-${detail.Quantity}`}>
                  {detail.products.ProductName} - {detail.Quantity}
                </div>
              ))}
            </div>
          </div>
          <p>
            <strong>Status:</strong> {statusOld}
          </p>
        </div>

        <div className="form-block">
          <form onSubmit={handleSubmit} className="centered-form">
            <h3>New status:</h3>
            <div className="radio">
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="accepted"
                  checked={status === "accepted"}
                  onChange={handleChange}
                />
                <label class="form-check-label">Accepted</label>
              </div>

              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="on the way"
                  checked={status === "on the way"}
                  onChange={handleChange}
                />
                <label class="form-check-label">On the Way</label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="delivered"
                  checked={status === "delivered"}
                  onChange={handleChange}
                />
                <label class="form-check-label">Delivered</label>
              </div>
            </div>

            {errorMessage && <p className="err">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <button type="submit" className="btn btn btn-primary ">
              {" "}
              Change
              <BsPencil />
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }

        .success {
          color: green;
        }

        .err {
          color: err;
        }

        .info-block {
          flex: 1;
          border: 1px;
          border-style: solid;
          border-color: #006670;
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 10px;
          margin: 5px;
        }

        .form-block {
          flex: 1;
          padding-left: 20px;
          border: 1px;
          border-style: solid;
          border-color: #006670;
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 10px;
          margin: 5px;
        }

        .radio {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .centered-form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </DeliverySidebar>
  );
};

export default ChangeStatus;
