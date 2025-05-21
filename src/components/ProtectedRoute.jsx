import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectCurrentRole,
} from "../app/features/authSlice";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectCurrentRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
