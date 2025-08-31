// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";

import Layout from "./components/Layout.jsx";
import Analyze from "./pages/Analyze.jsx";
import History from "./pages/History.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Devices from "./pages/Devices.jsx";     // 👈 new page for “Sync with your devices”
import Exercises from "./pages/Exercises.jsx"; // 👈 exercise finder page

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;                // or a spinner if you prefer
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home */}
        <Route index element={<Analyze />} />

        {/* Public pages */}
        <Route path="/about" element={<About />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages */}
        <Route
          path="/history"
          element={
            <Protected>
              <History />
            </Protected>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
