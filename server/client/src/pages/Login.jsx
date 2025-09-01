import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onLogin === "function") onLogin(email, password);
    // else: handle your existing login flow here
  };

  return (
    <main className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Log in</h1>
        <p className="auth-sub">Welcome back! Enter your details.</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-wide">
            Log in
          </button>
        </form>

        <p className="auth-alt">
          No account yet?{" "}
          <a href="/signup" className="link">
            Create account
          </a>
        </p>
      </div>
    </main>
  );
}
