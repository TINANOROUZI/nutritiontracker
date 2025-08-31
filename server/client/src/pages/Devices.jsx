// src/pages/Devices.jsx
import React from "react";
import { motion } from "framer-motion";

// ✅ match your real filenames/locations
import appleWatch from "../assets/devices/apple-watch.jpg";
import googleFit from "../assets/devices/google-fit.jpg";

export default function Devices() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="top-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* ------------------ Apple Health ------------------ */}
        <section className="qa-card" style={{ overflow: "hidden" }}>
          <a
            href="https://www.apple.com/ios/health/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Apple Health information"
          >
            <img
              src={appleWatch}
              alt="Apple Watch Activity Rings on iPhone"
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                display: "block",
                borderRadius: 12,
                marginBottom: 12,
              }}
            />
          </a>

          <h2 style={{ margin: 0 }}>Set up on iPhone (Apple Health)</h2>
          <ol style={{ lineHeight: 1.6 }}>
            <li>
              Open the <strong>Health</strong> app → <em>Browse</em> → Activity.
            </li>
            <li>
              Confirm your sources (Apple Watch / iPhone) are recording steps &
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

          <button className="btn btn-primary" type="button" disabled>
            Connect Apple Health (demo)
          </button>

          <p className="muted" style={{ marginTop: 10 }}>
            This is a demo button — connection flows are mocked for now.
          </p>
        </section>

        {/* ------------------ Google Fit ------------------ */}
        <section className="qa-card" style={{ overflow: "hidden" }}>
          <a
            href="https://www.google.com/fit/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Google Fit information"
          >
            <img
              src={googleFit}
              alt="Google Fit activity on Android"
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                display: "block",
                borderRadius: 12,
                marginBottom: 12,
              }}
            />
          </a>

          <h2 style={{ margin: 0 }}>Set up on Android (Google Fit)</h2>
          <ol style={{ lineHeight: 1.6 }}>
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
              Come back to the analyzer — estimates will use your activity
              context.
            </li>
          </ol>

          <button className="btn btn-primary" type="button" disabled>
            Connect Google Fit (demo)
          </button>

          <p className="muted" style={{ marginTop: 10 }}>
            Demo only — no real external data is read in this sample.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
