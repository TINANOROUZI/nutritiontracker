import React from "react";

// ✅ use your exact filenames and paths
import appleWatch from "../assets/devices/apple-watch.jpg";
import googleFit  from "../assets/devices/google-fit.jpg";

export default function Devices() {
  const demo = (what) =>
    alert(`${what} demo — this sample does not connect to external services.`);

  return (
    <div className="container" style={{ marginTop: 12 }}>
      {/* two nice cards in a grid; only the yellow buttons are interactive */}
      <div
        className="feature-grid"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }} // force 2 columns
      >
        {/* ---------- iPhone / Apple Health ---------- */}
        <section className="feature pic-left" aria-label="Apple Health setup">
          {/* PURE IMAGE — not wrapped in a link */}
          <div className="f-img">
            <img
              src={appleWatch}
              alt="Apple Watch Activity Rings on iPhone"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="f-body">
            <h2 className="f-title">Set up on iPhone (Apple Health)</h2>
            <ol className="list" style={{ lineHeight: 1.65, margin: "8px 0 14px" }}>
              <li>
                Open the <strong>Health</strong> app → <em>Browse</em> → Activity.
              </li>
              <li>
                Confirm your sources (Apple Watch / iPhone) are recording steps &amp;
                workouts.
              </li>
              <li>
                In NutriVision, tap <strong>Connect Apple Health</strong> and allow
                permissions.
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
              This is a demo button — connection flows are mocked for now.
            </p>
          </div>
        </section>

        {/* ---------- Android / Google Fit ---------- */}
        <section className="feature pic-right" aria-label="Google Fit setup">
          {/* PURE IMAGE — not wrapped in a link */}
          <div className="f-img">
            <img
              src={googleFit}
              alt="Google Fit activity on Android"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="f-body">
            <h2 className="f-title">Set up on Android (Google Fit)</h2>
            <ol className="list" style={{ lineHeight: 1.65, margin: "8px 0 14px" }}>
              <li>
                Install the <strong>Google Fit</strong> app and sign in.
              </li>
              <li>
                Enable activity tracking and connect your wearable if you use one.
              </li>
              <li>
                In NutriVision, tap <strong>Connect Google Fit</strong> and grant
                permissions.
              </li>
              <li>
                Come back to the analyzer — estimates will use your activity context.
              </li>
            </ol>

            {/* ONLY THIS BUTTON IS CLICKABLE */}
            <button className="btn btn-primary" onClick={() => demo("Google Fit")}>
              Connect Google Fit (demo)
            </button>

            <p className="muted small" style={{ marginTop: 8 }}>
              Demo only — no real external data is read in this sample.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
