import Link from "next/link";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const logout = async () => {
    localStorage.removeItem("token");

    const logout = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/auth/logout`,
      {
        method: "POST",
      }
    );

    const data = await logout.json();
    await router.push("/login");
  };

  return (
    <>
      <Link legacyBehavior href={`/basket`}>
        <button class="btn btn-outline-light my-2 my-sm-0">basket</button>
      </Link>

      <li className="nav-item">
        <button class="btn btn-outline-light my-2 my-sm-0" onClick={logout}>
          Logout
        </button>
      </li>
    </>
  );
};

export default LogoutButton;
