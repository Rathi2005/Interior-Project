import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    
    // check expiry (exp is in seconds, Date.now() gives ms)
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // invalid token case
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // if valid, render the component
  return children;
};

export default ProtectedRoute;
