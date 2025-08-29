// src/components/Layout.jsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Ticker from "./Ticker.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

const pageMeta = {
  "/": { title: "AI-Powered Nutrition Tracker", subtitle: "Upload a meal photo → instant calories & macros." },
  "/history": { title: "History", subtitle: "Your saved meals and nutrition estimates." },
  "/about": { title: "About", subtitle: "Full-stack + ML demo for smarter nutrition." },
  "/login": { title: "Log in", subtitle: "Access your saved meals from anywhere." },
  "/signup": { title: "Sign up", subtitle: "Create your account in seconds." } // reachable from Login only
};

export default function Layout(){
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta["/"];
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen(v => !v);

  // close drawer on route change
  useEffect(() => { close(); }, [pathname]);
  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const doLogout = async () => { await logout(); nav("/"); };

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">🍎 NutriVision</div>

          {/* Desktop links */}
          <nav className="links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/about">About</NavLink>
            {!user && <NavLink to="/login">Log in</NavLink>}
            {user && <span className="muted small" style={{ marginLeft: 12 }}>
              Hi, {user.name || user.email}
            </span>}
            {user && <button className="btn" style={{ marginLeft: 8 }} onClick={doLogout}>Logout</button>}
          </nav>

          {/* Hamburger — stays on the right on mobile */}
          <button
            className="hamburger"
            aria-label="Menu"
            aria-controls="mobile-drawer"
            aria-expanded={open ? "true" : "false"}
            onClick={toggle}
            style={{ marginLeft: "auto" }}   // <-- keeps it right-aligned when links are hidden
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Ticker under navbar */}
      <Ticker text={`${meta.title} — ${meta.subtitle}`} />

      <main className="wrap">
  <Outlet />
</main>

{/* Footer now outside of wrap, at page bottom */}
<footer className="footer muted small" style={{ marginTop: "auto" }}>
  Model: Food-101 (Hugging Face) • React + Vite • v0.3
</footer>



      {/* Backdrop */}
      {open && <div className="drawer-backdrop" onClick={close} />}

      {/* Mobile drawer */}
      <aside
        id="mobile-drawer"
        className={`drawer ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-inner">
          <div className="drawer-header">
            <span className="brand">🍎 NutriVision</span>
            <button className="drawer-close" onClick={close} aria-label="Close">✕</button>
          </div>
          <nav className="drawer-links" onClick={close}>
            <NavLink to="/" end>Home</NavLink>
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
