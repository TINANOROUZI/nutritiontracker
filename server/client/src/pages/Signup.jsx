import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";


export default function Signup() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();                     // <- critical
    setErr("");
    setLoading(true);
    try {
      await register(email, password, name); // calls api.register
      nav("/");                              // go somewhere after signup
    } catch (e) {
      setErr(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        {err && <div className="bmi-msg" style={{color:"#fca5a5"}}>{err}</div>}

        <form className="form" onSubmit={onSubmit}>
          <div className="form-row">
            <label>Name (optional)</label>
            <input className="input" value={name}
                   onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" value={email}
                   onChange={(e)=>setEmail(e.target.value)} required />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} required />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
