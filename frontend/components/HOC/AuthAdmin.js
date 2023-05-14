import React from "react";
import Router from "next/router";
import { tokenAuthenticate, isAdmin } from "../../lib/auth/auth-helpers";

const AuthAdmin = (Component) => {
  class WithAuth extends React.Component {
    constructor() {
      super();
      this.state = {
        isAdmin: false,
      };
    }
    async componentDidMount() {
      const content = await tokenAuthenticate(localStorage.getItem("token"));
      if (!isAdmin(content.user)) {
        return Router.replace("/");
      }
      this.setState({ isAdmin: true });
    }
    render() {
      return <>{this.state.isAdmin ? <Component /> : <h3></h3>}</>;
    }
  }
  return WithAuth;
};

export default AuthAdmin;
