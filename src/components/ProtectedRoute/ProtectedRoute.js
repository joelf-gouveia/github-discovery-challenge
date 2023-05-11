
import React from 'react';
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import paths from '../../constants/paths';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  console.log('user', user);
  if (!user) {
    // user is not authenticated
    return <Navigate to={paths.Login} />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.any
}

export default ProtectedRoute;
