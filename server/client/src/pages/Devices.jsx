import React from "react";

// use your exact filenames
import appleWatch from "../assets/devices/apple-watch.jpg";
import googleFit  from "../assets/devices/google-fit.jpg";

export default function Devices() {
  const demo = (name) =>
    alert(`${name} demo — this sample doesn’t connect to real services.`);

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="device-grid">
        {/* ---------- Apple Health ---------- */}
        <section className="device-card" aria-label="Apple Health setup">
          {/* PURE IMAGE (not clickable) */}
          <div className="device-hero">
            <img
              src={appleWatch}
              alt="Apple Watch activity rings on iPhone"
            />
          </div>

          <div className="f-body">
            <h2 className="f-title">Set up on iPhone (Apple Health)</h2>
            <ol className="list" style={{ lineHeight: 1.65, margin: "8px 0 14px" }}>
              <li>
                Open the <strong>Health</strong> app → <em>Browse</em> → Activity.
              </li>
              <li>
                Confirm Apple Watch / iPhone are recording steps &amp; workouts.
              </li>
              <li>
                In NutriVision, tap <strong>Connect Apple Health</strong> and allow permissions.
              </li>
              <li>
                Return to the analyzer — your activity will inform estimates.
              </li>
            </ol>

            {/* ONLY THIS BUTTON IS CLICKABLE */}
            <button className="btn btn-primary" onClick={() => demo("Apple Health")}>
              Connect Apple Health (demo)
            </button>

            <p className="muted small" style={{ marginTop: 8 }}>
              Demo only — connection flows are mocked.
            </p>
          </div>
        </section>

        {/* ---------- Google Fit ---------- */}
        <section className="device-card" aria-label="Google Fit setup">
          {/* PURE IMAGE (not clickable) */}
          <div className="device-hero">
            <img
              src={googleFit}
              alt="Google Fit activity on Android"
            />
          </div>

          <div className="f-body">
            <h2 className="f-title">Set up on Android (Google Fit)</h2>
            <ol className="list" style={{ lineHeight: 1.65, margin: "8px 0 14px" }}>
              <li>Install the <strong>Google Fit</strong> app and sign in.</li>
              <li>Enable activity tracking and connect your wearable (if any).</li>
              <li>In NutriVision, tap <strong>Connect Google Fit</strong> and grant permissions.</li>
              <li>Return to the analyzer — estimates use your activity context.</li>
            </ol>

            {/* ONLY THIS BUTTON IS CLICKABLE */}
            <button className="btn btn-primary" onClick={() => demo("Google Fit")}>
              Connect Google Fit (demo)
            </button>

            <p className="muted small" style={{ marginTop: 8 }}>
              Demo only — no real external data is read.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
