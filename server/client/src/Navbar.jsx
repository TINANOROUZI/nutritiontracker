import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">🍎 NutriVision</div>

        {/* Desktop links */}
        <nav className="links">
          <a href="#analyze">Analyze</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setOpen(false)}
          ></div>
          <div className="drawer show">
            <div className="drawer-inner">
              <div className="drawer-header">
                <span>Menu</span>
                <button
                  className="drawer-close"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
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
