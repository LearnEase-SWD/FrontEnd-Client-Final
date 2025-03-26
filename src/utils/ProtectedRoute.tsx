import { message } from "antd";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store/store";

type ProtectedRouteProps = {
  allowedRoles?: string[]; // Optional for public routes
  children?: ReactNode; // Optional if using Outlet for nested routes
};

const ProtectedRoute = ({
  allowedRoles = [],
  children,
}: ProtectedRouteProps) => {
  const { currentUser, token } = useSelector(
    (state: RootState) => state.auth.login
  );
  const userRole = currentUser ? currentUser.role : "";
  // If allowedRoles is empty, make it a public route.
  if (allowedRoles.length === 0) {
    // If the user is already logged in, prevent them from accessing public routes (e.g., login/signup)
    if (currentUser && token) {
      return <Navigate to="/" />;
    }
    return children ? <>{children}</> : <Outlet />;
  }

  // For protected routes with specific allowedRoles, check authentication and role
  if (!currentUser && !token) {
    message.destroy();
    message.error("You must be logged in to do this action.");
    return <Navigate to="/login" />; 
    
  }

  // If user is authenticated but doesn't have the required role
  if (!allowedRoles.includes(userRole)) {
    localStorage.setItem("unauthorized", "true");
    // localStorage.removeItem("isNotExist");
    return <Navigate to="/" />;
  }

  // If authenticated and role matches, render children or Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
