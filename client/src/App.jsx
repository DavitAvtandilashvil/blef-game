import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import PreGame from "./pages/PreGame";
import Game from "./pages/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pre-game" element={<PreGame />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
