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
        if (!isUser(content.user)) {
          return Router.push("/login");
        }
      } else {
        console.log("Invalid user data");
      }

      this.setState({ isAuthenticated: true });
    }
    render() {
      const { isAuthenticated } = this.state;
      if (!isAuthenticated) {
        return (
          <h2>У неавторизованных пользователей нет доступа к этой странице</h2>
        );
      }
      return <Component {...this.props} />;
    }
  }
  return WithAuth;
};

export default AuthUser;
