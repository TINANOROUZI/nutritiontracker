import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* Left side: brand */}
        <div className="brand">🍎 <strong>NutriVision</strong></div>

        {/* Right side: links + hamburger (links hide on mobile) */}
        <div className="nav-right">
          <nav className="links">
            <a href="#analyze">Analyze</a>
            <a href="#history">History</a>
            <a href="#about">About</a>
          </nav>

          {/* Three-line hamburger */}
          <button
            className={`hamburger-3 ${open ? "is-open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
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
