import DefaultLayout from "@/components/layouts/defaultLayout";
import OrderItem from "@/components/orderItems";
import AuthUser from "@/components/HOC/AuthUser";
import styles from "../styles/Product.module.css";

export const getServerSideProps = async (ctx) => {

  const userOrdersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Cookie: ctx.req.headers.cookie,
      },
    }
  );

  const { userOrders } = await userOrdersResponse.json();
  return {
    props: { data: userOrders },
  };
};

const UserOrders = ({ data }) => {
  return (
    <DefaultLayout>
      {data && data.length === 0 ? (
        <div className={styles.empty_basket}>
          <h3>You don't have any orders yet</h3>
        </div>
      ) : (
        <>
          <div>
            {data &&
              data.map((item, i) => {
                return <OrderItem {...item} key={i} />;
              })}
          </div>
        </>
      )}
    </DefaultLayout>
  );
};
export default AuthUser(UserOrders);
