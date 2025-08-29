import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setErr("");
      await login(email, password);
      nav("/history");  // redirect after login
    } catch {
      setErr("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" style={{maxWidth:520, margin:"16px auto"}}>
      <h2>Log in</h2>
      <form onSubmit={onSubmit} className="form">
        <label>Email
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        {err && <div className="error">{err}</div>}
        <button className="btn primary" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      {/* 👇 Link to Signup page */}
      <p className="small muted">
        No account yet?{" "}
        <Link to="/signup" className="accent-link">Create account</Link>
      </p>
    </section>
  );
}
