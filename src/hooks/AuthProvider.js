import React from 'react';
import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./";
import { auth } from "../config/firebase";
import paths from "../constants/paths";
import { signout } from '../services/auth.firebase';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("users", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const signin = async (data) => {
    setUser(data);
    navigate(paths.Discovery);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    signout();
    navigate(paths.Login, { replace: true });
  };

  auth.onAuthStateChanged((user) => {
    console.log("USER", user);
    if (!user) {
      logout();
    }
  });

  const value = useMemo(
    () => ({
      user,
      signin,
      logout,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.any
}

export const useAuth = () => {
  return useContext(AuthContext);
};