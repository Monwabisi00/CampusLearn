import { Navigate } from "react-router-dom";
import { authUtils } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = authUtils.getToken();

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;
