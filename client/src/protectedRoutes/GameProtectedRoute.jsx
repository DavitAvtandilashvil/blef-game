import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.";
import { useEffect } from "react";

function GameProtectedRoute({ children }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const navigate = useNavigate();

  const isUserValid = checkAuth();

  useEffect(() => {
    if (!isUserValid) {
      navigate("/auth");
    }
  }, [navigate, isUserValid]);

  return children;
}

export default GameProtectedRoute;
