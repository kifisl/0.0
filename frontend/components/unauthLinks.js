import Link from "next/link";
import { useRouter } from "next/router";

const Unauthlinks = () => {
  const router = useRouter();

  return (
    <div className="d-flex ">
      <li className="list-unstyled">
        <Link legacyBehavior href="/login">
          <button className="btn btn-outline-light me-2">Sign in</button>
        </Link>
      </li>
      <li className="list-unstyled">
        <Link legacyBehavior href="/registration">
          <button className="btn btn-outline-light me-2">Sign up</button>
        </Link>
      </li>
    </div>
  );
};

export default Unauthlinks;
