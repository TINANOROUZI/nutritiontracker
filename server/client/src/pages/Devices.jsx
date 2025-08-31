// server/client/src/pages/Devices.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function usePersistedFlag(key, initial = false) {
  const [v, setV] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? raw === "1" : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, v ? "1" : "0");
    } catch {}
  }, [key, v]);
  return [v, setV];
}

export default function Devices() {
  const [apple, setApple] = usePersistedFlag("nv_connect_apple", false);
  const [google, setGoogle] = usePersistedFlag("nv_connect_google", false);

  return (
    <motion.section
      className="container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="card" style={{ padding: 20, marginBottom: 18 }}>
        <h2>Connect your devices</h2>
        <p style={{ opacity: 0.9 }}>
          Link Apple Health<span style={{ fontSize: 12 }}>®</span> and Google
          Fit<span style={{ fontSize: 12 }}>™</span> so your activity (steps,
          workouts, heart-rate and calories) can inform your nutrition plan.
        </p>
        <p style={{ opacity: 0.75, fontSize: 14, marginTop: 6 }}>
          <strong>Note:</strong> This demo shows the flow/UI only—no real health
          data is read. Use the buttons below to simulate a connection.
        </p>
      </div>

      <div className="grid" style={{ gap: 16 }}>
        {/* Apple Health */}
        <div className="card" style={{ padding: 18 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>Apple Health</h3>
            <span
              className="tag"
              style={{
                background: apple ? "rgba(32,167,86,.15)" : "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
              }}
            >
              {apple ? "Connected" : "Not connected"}
            </span>
          </div>
          <p style={{ opacity: 0.85 }}>
            Sync steps, workouts, active energy and heart rate from your iPhone
            or Apple Watch.
          </p>
          <div className="row" style={{ gap: 10 }}>
            {!apple ? (
              <button className="btn btn-primary" onClick={() => setApple(true)}>
                Connect Apple Health
              </button>
            ) : (
              <button className="btn" onClick={() => setApple(false)}>
                Disconnect
              </button>
            )}
          </div>
        </div>

        {/* Google Fit */}
        <div className="card" style={{ padding: 18 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>Google Fit</h3>
            <span
              className="tag"
              style={{
                background: google ? "rgba(32,167,86,.15)" : "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
              }}
            >
              {google ? "Connected" : "Not connected"}
            </span>
          </div>
          <p style={{ opacity: 0.85 }}>
            Sync steps, workouts and calories from your Android device or any
            app connected to Google Fit.
          </p>
          <div className="row" style={{ gap: 10 }}>
            {!google ? (
              <button className="btn btn-primary" onClick={() => setGoogle(true)}>
                Connect Google Fit
              </button>
            ) : (
              <button className="btn" onClick={() => setGoogle(false)}>
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
