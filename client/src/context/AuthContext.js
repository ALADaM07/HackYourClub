import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const { performFetch, cancelFetch } = useFetch(
    "/users/me",
    (userResponse) => {
      setUser(userResponse.result);
      setIsLoggedIn(true);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    performFetch({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
