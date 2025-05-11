// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUser = () => {
    axios
      .get("http://localhost:8089/auth/user/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  };

  // Chargement initial à la montée de l'application
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
