
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet} from 'react-router-dom'

export const ProtectedRoute = ({ isAllowed, redirectPath = "/login", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.any
}
