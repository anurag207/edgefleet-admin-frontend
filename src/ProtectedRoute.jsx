
import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "./utils/authCheck";

const ProtectedRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
