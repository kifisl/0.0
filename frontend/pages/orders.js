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
  const sortedUserOrders = userOrders.sort((a, b) => b.id - a.id);

  return {
    props: { data: sortedUserOrders },
  };
};

const UserOrders = ({ data }) => {
  const sortedOrders = data.sort((a, b) => b.id - a.id);

  return (
    <DefaultLayout>
      <div className=".flex-column-reverse">
        {data && data.length === 0 ? (
          <div className={styles.empty_basket}>
            <h3>You don't have any orders yet</h3>
          </div>
        ) : (
          <>
            <div>
              {sortedOrders &&
                sortedOrders.map((item, i) => {
                  return <OrderItem {...item} key={i} />;
                })}
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};
export default AuthUser(UserOrders);
