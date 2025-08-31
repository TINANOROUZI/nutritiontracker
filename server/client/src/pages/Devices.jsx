import React from "react";
import { Link } from "react-router-dom";

export default function Devices() {
  return (
    <main className="page">
      <section className="card">
        <h1>Sync with your devices</h1>
        <p className="muted">
          Connect Apple Health® and Google Fit™ so your steps, workouts,
          heart-rate and calories can inform your nutrition insights.
        </p>

        <div className="grid gap">
          <article className="panel">
            <h2>Apple Health (iOS)</h2>
            <ol className="list">
              <li>Open the NutriVision app on your iPhone.</li>
              <li>Go to <strong>Profile → Devices</strong>.</li>
              <li>Tap <strong>Connect Apple Health</strong> and grant permissions.</li>
            </ol>
            <p className="muted">
              We read activity, workouts and energy burned. We never write or sell
              your data.
            </p>
            <a
              className="btn"
              target="_blank"
              rel="noreferrer"
              href="https://www.apple.com/ios/health/"
            >
              Learn about Apple Health
            </a>
          </article>

          <article className="panel">
            <h2>Google Fit (Android)</h2>
            <ol className="list">
              <li>Open the NutriVision app on your Android phone.</li>
              <li>Go to <strong>Profile → Devices</strong>.</li>
              <li>Tap <strong>Connect Google Fit</strong> and select your account.</li>
            </ol>
            <p className="muted">
              We read steps, workouts and calories to estimate daily activity.
            </p>
            <a
              className="btn"
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/fit/"
            >
              Learn about Google Fit
            </a>
          </article>
        </div>

        <div style={{ marginTop: 24 }}>
          <Link to="/" className="btn btn-ghost">← Back to Analyze</Link>
        </div>
      </section>
    </main>
  );
}
