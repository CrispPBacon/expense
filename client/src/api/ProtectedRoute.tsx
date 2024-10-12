import axios from "axios";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ProtectedRoute() {
  const location = useLocation();

  const token = cookies.get("TOKEN");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/auth", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch(() => cookies.remove("TOKEN"));
    }
  }, [token]);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
