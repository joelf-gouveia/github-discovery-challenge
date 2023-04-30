import React from 'react';
import { useOutlet } from "react-router-dom";
import { AuthProvider } from "../../hooks/AuthProvider";

const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};

export default AuthLayout;