import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectCurrentRole,
} from "../app/features/authSlice";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";

const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectCurrentRole);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={role === "manager" ? "/" : "/products"} replace />
          ) : (
            <Login />
          )
        }
      />
      {/* Manager Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* Products (Manager + Store Keeper) */}
      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRoles={["manager", "store_keeper"]}>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* Default: Store Keeper ko /products par bhejein, Manager ko / par */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to={role === "manager" ? "/" : "/products"} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default Router;
