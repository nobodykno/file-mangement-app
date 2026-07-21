import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";

interface JwtPayload {
  exp: number;
}

const AuthGuard = () => {
  const { token, logout } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Token expired
    if (decoded.exp <= currentTime) {
      logout();

      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // Invalid JWT
    logout();

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;