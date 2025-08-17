import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.";
import { useEffect } from "react";

function AuthProtectedRoute({ children }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const navigate = useNavigate();

  const isUserValid = checkAuth();

  useEffect(() => {
    if (isUserValid) {
      navigate("/pre-game");
    }
  }, [isUserValid, navigate]);

  return children;
}

export default AuthProtectedRoute;
