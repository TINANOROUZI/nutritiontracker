import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">🍎 <strong>NutriVision</strong></div>

        {/* Desktop links */}
        <nav className="links">
          <a href="#analyze">Analyze</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </nav>

        {/* Hamburger with 3 spans */}
        <button
          className={`hamburger-min ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Drawer */}
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
