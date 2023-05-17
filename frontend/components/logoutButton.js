import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/lib/auth/AuthContext";
import { useContext } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const { setAuthenticated, setIsAdminUser, setIsDeliveryUser } =
    useContext(AuthContext);
  const logout = async () => {
    localStorage.removeItem("token");

    const logout = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/auth/logout`,
      {
        method: "POST",
      }
    );

    const data = await logout.json();
    setAuthenticated(false);
    setIsAdminUser(false);
    setIsDeliveryUser(false);
    await router.push("/login");
  };

  return (
    <>
      <li className="list-unstyled">
        <button className="btn btn-outline-light my-2 my-sm-0" onClick={logout}>
          Logout
        </button>
      </li>
    </>
  );
};

export default LogoutButton;
