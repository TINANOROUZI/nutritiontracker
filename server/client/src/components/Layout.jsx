// src/components/Layout.jsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Ticker from "./Ticker.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const pageMeta = {
  "/":        { title: "AI-Powered Nutrition Tracker", subtitle: "Upload a meal photo → instant calories & macros." },
  "/devices": { title: "Connect your devices",         subtitle: "Apple Health & Google Fit sync." },
  "/exercises": { title: "Exercises",                  subtitle: "Search workouts by muscle & equipment." },
  "/history": { title: "History",                      subtitle: "Your saved meals and nutrition estimates." },
  "/about":   { title: "About",                        subtitle: "Full-stack + ML demo for smarter nutrition." },
  "/login":   { title: "Log in",                       subtitle: "Access your saved meals from anywhere." },
  "/signup":  { title: "Sign up",                      subtitle: "Create your account in seconds." }
};

export default function Layout() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta["/"];
  const auth = useAuth() || {};
  const { user, logout } = auth;
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen(v => !v);

  useEffect(() => { close(); }, [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doLogout = async () => { try { await logout?.(); } finally { nav("/"); } };

  return (
    <>
      {/* --- Top nav --- */}
      <header className="nav">
        <div className="nav-row">
          <div className="brand">
            <span className="brand-dot" /> NutriVision
          </div>

          {/* Desktop links */}
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/devices">Devices</NavLink>
            <NavLink to="/exercises">Exercises</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/about">About</NavLink>
            {!user && <NavLink to="/login">Log in</NavLink>}
            {user && <span className="muted small" style={{ marginLeft: 8 }}>Hi, {user.name || user.email}</span>}
            {user && (
              <button className="btn" style={{ marginLeft: 8 }} onClick={doLogout}>
                Logout
              </button>
            )}
          </nav>

          {/* Hamburger for mobile */}
          <button
            className="hamburger"
            aria-label="Menu"
            aria-controls="mobile-drawer"
            aria-expanded={open ? "true" : "false"}
            onClick={toggle}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Scrolling ticker under navbar */}
      <Ticker text={`${meta.title} — ${meta.subtitle}`} />

      {/* Main page content */}
      <main className="wrap">
        <Outlet />
      </main>

      {/* Footer at the very bottom */}
      <footer className="footer muted small">
        Model: Food-101 (Hugging Face) • React + Vite • v0.3
      </footer>

      {/* Backdrop for drawer */}
      {open && <div className="drawer-backdrop" onClick={close} />}

      {/* Mobile drawer (hidden by default) */}
      <aside
        id="mobile-drawer"
        className={`drawer ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-inner">
          <div className="drawer-header">
            <span className="brand"><span className="brand-dot" /> NutriVision</span>
            <button className="drawer-close" onClick={close} aria-label="Close">✕</button>
          </div>
          <nav className="drawer-links" onClick={close}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/devices">Devices</NavLink>
            <NavLink to="/exercises">Exercises</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/about">About</NavLink>
            {!user && <NavLink to="/login">Log in</NavLink>}
            {user && <button className="btn" onClick={doLogout}>Logout</button>}
          </nav>
        </div>
      </aside>
    </>
  );
}
