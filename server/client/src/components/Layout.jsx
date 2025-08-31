// src/components/Layout.jsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Ticker from "./Ticker.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const pageMeta = {
  "/": { title: "AI-Powered Nutrition Tracker", subtitle: "Upload a meal photo → instant calories & macros." },
  "/devices": { title: "Devices", subtitle: "Connect Apple Health® & Google Fit™." },
  "/exercises": { title: "Exercises", subtitle: "Find workouts you love and stay motivated." },
  "/history": { title: "History", subtitle: "Your saved meals and nutrition estimates." },
  "/about": { title: "About", subtitle: "Full-stack + ML demo for smarter nutrition." },
  "/login": { title: "Log in", subtitle: "Access your saved meals from anywhere." }
};

export default function Layout(){
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta["/"];
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen(v => !v);

  useEffect(() => { close(); }, [pathname]); // close drawer on route change
  useEffect(() => {
    const onKey = e => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doLogout = async () => { await logout(); nav("/"); };

  return (
    <>
      <header className="nav">
        <div className="nav-row">
          <div className="brand">🍎 NutriVision</div>

          {/* desktop links (old, working class name) */}
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            {" "}
            <NavLink to="/devices">Devices</NavLink>
            {" "}
            <NavLink to="/exercises">Exercises</NavLink>
            {" "}
            <NavLink to="/history">History</NavLink>
            {" "}
            <NavLink to="/about">About</NavLink>
            {" "}
            {!user && <NavLink to="/login">Log in</NavLink>}
            {user && (
              <>
                <span className="muted small" style={{ marginLeft: 12 }}>
                  Hi, {user.name || user.email}
                </span>
                <button className="btn" style={{ marginLeft: 8 }} onClick={doLogout}>Logout</button>
              </>
            )}
          </nav>

          {/* hamburger (only visible on mobile) */}
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

      <Ticker text={`${meta.title} • ${meta.subtitle}`} />

      <main className="container" style={{ padding: "12px 0 20px" }}>
        <Outlet />
      </main>

      <footer className="footer">
        Model: Food-101 (Hugging Face) • React + Vite • v0.3
      </footer>

      {open && <div className="drawer-backdrop" onClick={close} />}

      {/* mobile drawer */}
      <aside id="mobile-drawer" className={`drawer ${open ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer-inner">
          <div className="drawer-header">
            <span className="brand">🍎 NutriVision</span>
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
