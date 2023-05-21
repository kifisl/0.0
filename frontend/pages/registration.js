import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { AuthContext } from "@/lib/auth/AuthContext";
import { useContext } from "react";
import { saveTokenAndAuthenticate } from "@/lib/auth/auth-helpers";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setAuthenticated, setIsAdminUser, setIsDeliveryUser } =
    useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== passwordConf) {
      return setErrorMessage("Passwords should match");
    }
    await fetch(`/v1/auth/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.status == 200) {
        setAuthenticated(true);
        res.json().then(async (data) => {
          await saveTokenAndAuthenticate(data.refreshToken);
        });
        setIsAdminUser(false);
        setIsDeliveryUser(false);
        return router.push("/activateinfo");
      } else if (res.status == 400) {
        res.json().then((data) => {
          setErrorMessage(data.e);
        });
      }
    });
  };
  return (
    <DefaultLayout>
      <div>
        <form
          onSubmit={submit}
          style={{
            width: 100 + "%",
            maxWidth: 500 + "px",
            margin: 0 + " auto",
            padding: 15 + "px",
          }}
        >
          <h1>Signup</h1>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            className="form-control"
            placeholder="Email.."
            required
            pattern="[a-z0-9]+\.?[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password.."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            name="confirm-password"
            type="password"
            className="form-control"
            placeholder="repeat password"
            required
            onChange={(e) => setPasswordConf(e.target.value)}
          />
          <h6 className="text-danger">{errorMessage}</h6>
          <button type="submit" className="btn btn-info">
            Signup
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Registration;
