// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";

// Existing pages
import Analyze from "./pages/Analyze.jsx";
import History from "./pages/History.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// NEW pages
import Home from "./pages/Home.jsx";
import Exercises from "./pages/Exercises.jsx";

// Load the new theme (safe to include once here)
import "./styles/crono.css";

import { useAuth } from "./auth/AuthContext.jsx";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // you could show a spinner here
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* NEW: Home landing (BMI + Quick Analyze) */}
        <Route index element={<Home />} />

        {/* Keep the full Analyze page on its own route */}
        <Route path="/analyze" element={<Analyze />} />

        {/* NEW: Exercises page */}
        <Route path="/exercises" element={<Exercises />} />

        {/* History: requires login */}
        <Route
          path="/history"
          element={
            <Protected>
              <History />
            </Protected>
          }
        />

        {/* Existing routes */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
