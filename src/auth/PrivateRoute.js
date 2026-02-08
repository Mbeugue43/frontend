import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken, isTokenValid, decodeToken } from '../api/endpoint';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = getAuthToken();
  
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const payload = decodeToken(token);
    if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default PrivateRoute;
