import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { saveTokenAndAuthenticate } from "@/lib/auth/auth-helpers";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setAuthenticated } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    await fetch(`/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setAuthenticated(true);
        return res.json().then(async (data) => {
          const result = await saveTokenAndAuthenticate(data.refreshToken);
          if (result == "admin") {
            return router.push("/admin");
          } else if (result == "delivery") {
            return router.push("/delivery");
          }

          return router.push("/");
        });
      }
      res.json().then((data) => {
        setErrorMessage(data.error);
      });
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
          <h1>Signin</h1>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            className="form-control"
            placeholder="Email.."
            autoComplete="off"
            required
            //pattern="[a-z0-9]+\.?[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
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
          <h6 className="text-danger">{errorMessage}</h6>
          <button type="submit" className="btn btn-info">
            Signin
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Login;
