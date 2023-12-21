"use client";

import React, { useEffect, createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/constants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (initializing === true) {
      const storedAuth = Cookies.get(COOKIE_KEYS.AUTHENTICATION);

      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth(parsedAuth);
      }

      setTimeout(() => {
        setInitializing(false);
      }, 100);
    }
  }, []);

  async function storeAuth(authObject) {
    Cookies.set(COOKIE_KEYS.AUTHENTICATION, JSON.stringify(authObject));
    setAuth(authObject);
  }

  function destroyAuth() {
    Cookies.remove(COOKIE_KEYS.AUTHENTICATION);
    setAuth(null);
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { initializing, auth, storeAuth, destroyAuth } },
    children
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default useAuth;
