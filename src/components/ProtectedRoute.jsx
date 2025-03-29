import React from "react";
import { Navigate, replace } from "react-router-dom";

const Protect = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default Protect;
