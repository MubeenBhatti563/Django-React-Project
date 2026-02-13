import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
