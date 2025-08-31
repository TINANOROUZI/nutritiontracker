// server/client/src/App.jsx
import "./styles/crono.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Analyze from "./pages/Analyze.jsx";
import History from "./pages/History.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Exercises from "./pages/Exercises.jsx";
import Devices from "./pages/Devices.jsx";   // <-- NEW
import { useAuth } from "./auth/AuthContext.jsx";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Analyze />} />
        <Route path="/devices" element={<Devices />} /> {/* <-- NEW */}
        <Route path="/exercises" element={<Exercises />} />
        <Route
          path="/history"
          element={
            <Protected>
              <History />
            </Protected>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
