import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">🍎 NutriVision</div>

        {/* desktop links */}
        <nav className="links">
          <a href="#analyze">Analyze</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </nav>

        {/* minimal hamburger */}
        <button
          className={`hamburger-min ${open ? "is-open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="bar" />
        </button>
      </div>

      {/* mobile drawer (optional, keep if you need it) */}
      {open && (
        <>
          <div className="drawer-backdrop" onClick={() => setOpen(false)} />
          <div className="drawer show">
            <div className="drawer-inner">
              <div className="drawer-header">
                <span>Menu</span>
                <button className="drawer-close" onClick={() => setOpen(false)}>✕</button>
              </div>
              <div className="drawer-links">
                <a href="#analyze" onClick={() => setOpen(false)}>Analyze</a>
                <a href="#history" onClick={() => setOpen(false)}>History</a>
                <a href="#about" onClick={() => setOpen(false)}>About</a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
