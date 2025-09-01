import React, { useState } from "react";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSignup === "function") {
      onSignup({ name, email, password });
    }
    // else: connect to your existing signup API here
  };

  return (
    <main className="auth-wrap">
      <section className="auth-card" role="region" aria-labelledby="signup-title">
        <h1 id="signup-title" className="auth-title">Create account</h1>
        <p className="auth-sub">Start your journey in seconds.</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              className="input"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-wide">
            Sign up
          </button>
        </form>

        <p className="auth-alt">
          Already have an account?{" "}
          <a href="/login" className="link">Log in</a>
        </p>
      </section>
    </main>
  );
}
