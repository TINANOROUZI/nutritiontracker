import React from "react";
import { motion } from "framer-motion";

/**
 * Images are served from /public; no import needed with Vite.
 * Make sure the two files exist:
 *   /public/assets/devices/apple-watch.jpg
 *   /public/assets/devices/google-fit.jpg
 */

export default function Devices() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="device-grid">
        {/* ---------- iPhone / Apple Health ---------- */}
        <section className="device-card">
          {/* Make the image itself a link (opens Apple’s help page) */}
          <a
            className="device-img"
            href="https://support.apple.com/guide/iphone/track-daily-activity-iphb690d01f/ios"
            target="_blank"
            rel="noreferrer"
            aria-label="Learn about Apple Health activity rings"
          >
            <img
              src="/assets/devices/apple-watch.jpg"
              alt="Apple Watch Activity Rings on iPhone"
              loading="lazy"
            />
          </a>

          <div className="device-body">
            <h2>Set up on iPhone (Apple Health)</h2>
            <ol>
              <li>
                Open the <strong>Health</strong> app → <em>Browse</em> →
                Activity.
              </li>
              <li>
                Confirm your sources (Apple Watch / iPhone) are recording steps
                &amp; workouts.
              </li>
              <li>
                In NutriVision, tap <strong>Connect Apple Health</strong> and
                allow permissions.
              </li>
              <li>
                Return to the analyzer — your activity will inform estimates.
              </li>
            </ol>

            <button className="btn btn-primary">
              Connect Apple Health (demo)
            </button>
            <p className="muted small" style={{ marginTop: 8 }}>
              This is a demo button — connection flows are mocked for now.
            </p>
          </div>
        </section>

        {/* ---------- Android / Google Fit ---------- */}
        <section className="device-card">
          {/* Clickable image (goes to Google Fit site) */}
          <a
            className="device-img"
            href="https://www.google.com/fit/"
            target="_blank"
            rel="noreferrer"
            aria-label="Learn about Google Fit"
          >
            <img
              src="/assets/devices/google-fit.jpg"
              alt="Google Fit activity on Android"
              loading="lazy"
            />
          </a>

          <div className="device-body">
            <h2>Set up on Android (Google Fit)</h2>
            <ol>
              <li>
                Install the <strong>Google Fit</strong> app and sign in.
              </li>
              <li>
                Enable activity tracking and connect your wearable if you use
                one.
              </li>
              <li>
                In NutriVision, tap <strong>Connect Google Fit</strong> and
                grant permissions.
              </li>
              <li>
                Come back to the analyzer — estimates will use your activity
                context.
              </li>
            </ol>

            <button className="btn btn-primary">
              Connect Google Fit (demo)
            </button>
            <p className="muted small" style={{ marginTop: 8 }}>
              Demo only — no real external data is read in this sample.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
