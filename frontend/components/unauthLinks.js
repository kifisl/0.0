import Link from "next/link";
import { useRouter } from "next/router";

const Unauthlinks = () => {
  const router = useRouter();

  return (
    <>
      <li className="nav-item">
        <Link href="/login">
          <a className="nav-link activate">Sign in</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/registration">
          <a className="nav-link activate">Sign up</a>
        </Link>
      </li>
    </>
  );
};

export default Unauthlinks;
