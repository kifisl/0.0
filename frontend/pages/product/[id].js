import styles from "@/styles/Product.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BsFillCheckCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import DefaultLayout from "@/components/layouts/defaultLayout";

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
  const comments = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/comments/${context.query.id}`,
    {
      method: "GET",
    }
  );
  const content = await response.json();
  const commentsJson = await comments.json();
  return {
    props: { data: content, comments: commentsJson },
  };
};

const Id = ({ data, comments }) => {
  const [showForm, setShowForm] = useState(false);
  const [comData, setComData] = useState("");
  // const [message, setMessage] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);
  // const [role, setRole] = useState("");
  // const [newComms, setNewComms] = useState();

  // const router = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("/v1/auth/refresh", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const content = await response.json();
  //     if (content.user) {
  //       setMessage(content.user.email);
  //       setRole(content.user.role);
  //       console.log("true");
  //       return setAuthenticated(true);
  //     }
  //     setAuthenticated(false);
  //     console.log("false");
  //   })();
  // });

  const showForme = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  async function useForceUpdateComms() {
    const [newComms, setNewComms] = useState();
    return async () => {
      const content = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/comments/${data.product.ProductID}`,
        {
          method: "GET",
        }
      );

      setNewComms(await content.json());
    };
  }

  const sendComment = async (e) => {
    e.preventDefault();
    const request = fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/comments`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          productID: data.product.ProductID,
          body: comData,
        }),
      }
    );
    setShowForm(!showForm);
    const content = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/comments/${data.product.ProductID}`,
      {
        method: "GET",
      }
    );
    setNewComms(await content.json());
  };

  async function addToBucket(productID) {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/basket`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          productID: productID,
        }),
      }
    );
    if (request.ok) {
      return alert("Product has been added to basket");
    }
  }

  return (
    <DefaultLayout>
      <div className={styles.b_content}>
        <div>
          {/* <h6>
            {
              data.product
                .productcategories_products_ProductCategoryToproductcategories
                .CategoryName
            }
          </h6> */}
        </div>
        <div>
          <h1>{data.product.ProductName}</h1>
        </div>
        <div className="d-flex justify-content-around">
          <div className={styles.part_img_div}>
            <img
              src={process.env.SERVER_DOMAIN + data.product.ProductImage}
              alt=""
              width={300}
              height={199}
            />
          </div>
          <div className="d-inline ms-10">
            <h3>{data.product.ProductPrice + " BYN"}</h3>
            <p>{"Weight: " + data.product.ProductWeight + "g"}</p>
            <p>{data.product.ProductShortDesc}</p>
            <button
              onClick={() => addToBucket(data.product.ProductID)}
              className={styles.product_button}
            >
              Add to bucket
            </button>
          </div>
        </div>
        <form>
          <button onClick={showForme} className={styles.product_button}>
            Left a comment
          </button>
        </form>
        {showForm && (
          <form onSubmit={sendComment}>
            <label htmlFor="comBody">Comment: </label>
            <input
              name="comBody"
              className="form-control"
              onChange={(e) => setComData(e.target.value)}
            ></input>
            <input type="submit" className={styles.product_button} />
          </form>
        )}
        <div className="d-block">
          {comments.comments.map((obj, i) => (
            <>
              <div className="d-block">
                <div className="d-inline">
                  <div className={styles.comment}>
                    <p key={i}>{obj.users.UserEmail} : </p>
                    <p key={i}>{" " + obj.Comment}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Id;
