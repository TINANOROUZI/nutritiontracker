import { Link, NavLink } from "react-router-dom";

export default function NavBar(){
  return (
    <nav className="nav">
      <div className="container nav-row">
        <Link to="/" className="brand">
          <span className="brand-dot" />
          NutriVision
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/exercises">Exercises</NavLink>
          <NavLink to="/history">History</NavLink>
          <a className="btn-ghost btn" href="/login">Log in</a>
          <a className="btn-primary" href="/signup">Sign up</a>
        </div>
      </div>
    </nav>
  );
}
