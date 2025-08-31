import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Devices() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Hero / overview */}
      <section className="qa-card" style={{ marginTop: ".6rem" }}>
        <div
          className="f-img"
          style={{
            borderRadius: "12px",
            marginBottom: "12px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1599050751795-5cda1b85b26d?q=80&w=1600&auto=format&fit=crop)",
          }}
        />
        <h1 style={{ margin: 0 }}>Sync with your devices</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Connect <strong>Apple Health®</strong> and <strong>Google Fit™</strong> so your steps,
          workouts, heart-rate and active calories automatically inform your nutrition.
        </p>

        <div className="chips" style={{ marginTop: 10 }}>
          <span className="chip">Steps</span>
          <span className="chip">Workouts</span>
          <span className="chip">Heart-rate</span>
          <span className="chip">Active calories</span>
          <span className="chip">Sleep (optional)</span>
        </div>

        <div className="section" style={{ marginTop: 10 }}>
          <div className="metric">
            <div className="k">What syncs?</div>
            <div className="v">
              Daily totals and workout sessions are used to adjust targets and give more accurate
              nutrition feedback.
            </div>
          </div>
          <div className="metric">
            <div className="k">Privacy</div>
            <div className="v">
              This demo doesn’t sell or share health data. You can disconnect anytime. Only the
              minimum required metrics are requested.
            </div>
          </div>
        </div>
      </section>

      {/* Setup cards */}
      <div className="feature-grid">
        {/* iOS / Apple Health */}
        <div className="feature pic-left">
          <div
            className="f-img"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1600&auto=format&fit=crop)",
            }}
          />
          <div className="f-body">
            <div className="f-title">Set up on iPhone (Apple Health)</div>
            <ol style={{ marginLeft: "1.25rem", lineHeight: 1.7 }}>
              <li>Open the <strong>Health</strong> app → <em>Browse</em> → Activity.</li>
              <li>Confirm your sources (Apple Watch / iPhone) are recording steps & workouts.</li>
              <li>In NutriVision, tap <strong>Connect Apple Health</strong> and allow permissions.</li>
              <li>Return to the Home page and analyze a meal — activity will now inform estimates.</li>
            </ol>
            <button className="btn btn-primary" style={{ marginTop: 8 }} disabled>
              Connect Apple Health (demo)
            </button>
            <p className="muted small" style={{ marginTop: 6 }}>
              This is a demo button — connection flows are mocked for now.
            </p>
          </div>
        </div>

        {/* Android / Google Fit */}
        <div className="feature pic-mid">
          <div
            className="f-img"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1600&auto=format&fit=crop)",
            }}
          />
          <div className="f-body">
            <div className="f-title">Set up on Android (Google Fit)</div>
            <ol style={{ marginLeft: "1.25rem", lineHeight: 1.7 }}>
              <li>Install the <strong>Google Fit</strong> app and sign in.</li>
              <li>Enable activity tracking and connect your wearable if you use one.</li>
              <li>In NutriVision, tap <strong>Connect Google Fit</strong> and grant permissions.</li>
              <li>Come back to the analyzer — estimates will use your activity context.</li>
            </ol>
            <button className="btn btn-primary" style={{ marginTop: 8 }} disabled>
              Connect Google Fit (demo)
            </button>
            <p className="muted small" style={{ marginTop: 6 }}>
              Demo only — no real external data is read in this sample.
            </p>
          </div>
        </div>

        {/* FAQ / Tips */}
        <div className="feature pic-right">
          <div
            className="f-img"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1600&auto=format&fit=crop)",
            }}
          />
          <div className="f-body">
            <div className="f-title">Tips & FAQ</div>
            <ul style={{ marginLeft: "1.1rem", lineHeight: 1.7 }}>
              <li>
                <strong>Why connect?</strong> More accurate calorie suggestions and better trend
                insights.
              </li>
              <li>
                <strong>Can I disconnect?</strong> Yes — revoke permissions in your device settings.
              </li>
              <li>
                <strong>Which metrics are used?</strong> Steps, workouts, HR and active calories by
                default (sleep optional).
              </li>
              <li>
                <strong>Is my data safe?</strong> This is a demo; no third-party data is uploaded to
                public servers.
              </li>
            </ul>

            <div style={{ display: "flex", gap: "8px", marginTop: 8, flexWrap: "wrap" }}>
              <Link className="btn btn-ghost" to="/">
                ← Back to Analyzer
              </Link>
              <Link className="btn" to="/exercises">
                Explore exercises
              </Link>
              <Link className="btn" to="/history">
                View history
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
