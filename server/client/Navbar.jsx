export default function Navbar(){
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">🍎 NutriVision</div>
        <nav className="links">
          <a href="#analyze">Analyze</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}
