import React from "react";
import Router from "next/router";
import { tokenAuthenticate, isUser } from "../../lib/auth/auth-helpers";

const AuthUser = (Component) => {
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
      };
    }
    async componentDidMount() {
      const token = localStorage.getItem("token");
      if (!token) {
        return Router.push("/login");
      }

      const content = await tokenAuthenticate(token);
      if (content && content.user) {
        console.log(content.user);
        if (!isUser(content.user)) {
          return Router.push("/login");
        }
      } else {
        console.log("Invalid user data");
      }

      // if (!isUser(content.user)) {
      //   return Router.push("/login");
      // }

      this.setState({ isAuthenticated: true });
    }
    render() {
      const { isAuthenticated } = this.state;
      if (!isAuthenticated) {
        return <div>авторизуйтесь</div>;
      }
      return <Component {...this.props} />;
    }
  }
  return WithAuth;
};

export default AuthUser;
