import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import PreGame from "./pages/PreGame";
import Game from "./pages/Game";
import AuthProtectedRoute from "./protectedRoutes/AuthProtectedRoute";
import GameProtectedRoute from "./protectedRoutes/GameProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={
            <AuthProtectedRoute>
              <Auth />
            </AuthProtectedRoute>
          }
        />
        <Route
          path="/pre-game"
          element={
            <GameProtectedRoute>
              <PreGame />
            </GameProtectedRoute>
          }
        />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
