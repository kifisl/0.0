import { ADMIN_ROLE, USER_ROLE, DELIVERY_ROLE } from "./roles";

export const saveTokenAndAuthenticate = async (token) => {
  localStorage.setItem("token", token);
  const content = await tokenAuthenticate(token);
  if (isAdmin(content.user)) {
    return "admin";
  } else if (isDelivery(content.user)) {
    return "delivery";
  } else {
    return "user";
  }
};

export const tokenAuthenticate = async (token) => {
  const response = await fetch(`/v1/auth/refresh`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const content = await response.json();
  return content;
};

export const isAdmin = (user) => {
  if (user.role == ADMIN_ROLE) {
    return true;
  }
};

export const isUser = (user) => {
  if (user.role == USER_ROLE) {
    return true;
  }
};

export const isDelivery = (user) => {
  if (user.role == DELIVERY_ROLE) {
    return true;
  }
};
