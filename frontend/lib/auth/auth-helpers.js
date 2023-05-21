import { ADMIN_ROLE, USER_ROLE, DELIVERY_ROLE } from "./roles";
let authenticated = false;
let content = null;

export const saveTokenAndAuthenticate = async (token) => {
  localStorage.setItem("token", token);
  authenticated = false;
  content = null;
  if (!content) {
    content = await tokenAuthenticate(token);
  }
  if (content) {
    if (content && isAdmin(content.user)) {
      return "admin";
    } else if (content && isDelivery(content.user)) {
      return "delivery";
    } else if (content && isUser(content.user)) {
      return "user";
    }
  }
};

export const tokenAuthenticate = async (token) => {
  if (authenticated) {
    return content;
  }
  authenticated = true;
  content = null;

  const response = await fetch(`/v1/auth/refresh`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  content = await response.json();
  return content;
};

export const isAdmin = (user) => {
  if (user && user.role == ADMIN_ROLE) {
    return true;
  } else {
    return false;
  }
};

export const isUser = (user) => {
  if (user && user.role == USER_ROLE) {
    return true;
  } else {
    return false;
  }
};

export const isDelivery = (user) => {
  if (user && user.role == DELIVERY_ROLE) {
    return true;
  } else {
    return false;
  }
};
