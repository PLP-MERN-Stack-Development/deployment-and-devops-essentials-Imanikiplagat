import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Account";
import Transactions from "./pages/Transaction";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);
      setUser(data.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Check backend.");
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;
