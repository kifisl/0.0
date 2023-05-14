import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
