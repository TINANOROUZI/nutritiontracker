import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Signup(){
  const { register } = useAuth();
  const nav = useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setErr("");
      await register(email, password, name);
      nav("/history");  // redirect after signup
    } catch {
      setErr("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" style={{maxWidth:520, margin:"16px auto"}}>
      <h2>Create account</h2>
      <form onSubmit={onSubmit} className="form">
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} />
        </label>
        <label>Email
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        {err && <div className="error">{err}</div>}
        <button className="btn primary" disabled={loading}>
          {loading ? "Creating…" : "Sign up"}
        </button>
      </form>

      {/* 👇 Link back to Login page */}
      <p className="small muted">
        Already have an account?{" "}
        <Link to="/login" className="accent-link">Log in</Link>
      </p>
    </section>
  );
}
