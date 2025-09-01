import React from "react";

export default function About() {
  // Inline styles so old/global CSS can't break the layout
  const s = {
    wrap: {
      minHeight: "calc(100vh - 140px)",
      display: "grid",
      placeItems: "center",
      padding: "24px 10px",
    },
    card: {
      width: "min(960px, 94%)",
      background: "linear-gradient(180deg,#131a2b,#0f1524)",
      border: "1px solid var(--stroke)",
      borderRadius: 18,
      boxShadow: "var(--ring)",
      padding: "28px",
    },
    title: {
      margin: 0,
      fontSize: "clamp(1.6rem, 2.6vw, 2rem)",
      fontWeight: 900,
    },
    kicker: { color: "var(--muted)", margin: ".25rem 0 .9rem" },
    lead: { margin: ".25rem 0 1rem", lineHeight: 1.7 },
    list: { margin: ".2rem 0 1rem", paddingLeft: "1.2rem" },
    grid: {
      display: "grid",
      gap: 14,
      // Auto fits 1–3 columns depending on width (still centered)
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      marginTop: ".5rem",
    },
    block: {
      background: "#0b1222",
      border: "1px solid var(--stroke)",
      borderRadius: 14,
      padding: 14,
    },
    h3: { margin: ".1rem 0 .35rem", fontSize: "1.05rem", fontWeight: 900 },
    pMuted: { margin: 0, color: "var(--muted)", lineHeight: 1.6 },
  };

  return (
    <main style={s.wrap}>
      <section style={s.card} role="region" aria-labelledby="about-title">
        <h1 id="about-title" style={s.title}>About NutriVision</h1>
        <p style={s.kicker}>Full-stack + ML demo for smarter nutrition.</p>

        <p style={s.lead}>
          NutriVision recognizes meals from photos and estimates calories & macros
          using the Food-101 image model and a per-100g nutrition table. Our goal
          is to make healthy choices simpler and faster.
        </p>

        <ul style={s.list}>
          <li><strong>Frontend:</strong> React + Vite</li>
          <li><strong>Backend:</strong> Node + Express</li>
          <li><strong>ML:</strong> Food-101 model</li>
        </ul>

        <div style={s.grid}>
          <div style={s.block}>
            <h3 style={s.h3}>Our Site</h3>
            <p style={s.pMuted}>
              Fast, lightweight, and privacy-respecting. Upload a food photo, get
              instant insights, and save results for later review.
            </p>
          </div>

          <div style={s.block}>
            <h3 style={s.h3}>Healthy Habits</h3>
            <p style={s.pMuted}>
              We focus on consistency: balanced plates, mindful portions, water
              first, and daily movement you enjoy.
            </p>
          </div>

          <div style={s.block}>
            <h3 style={s.h3}>Food</h3>
            <p style={s.pMuted}>
              Mix whole foods—lean proteins, colorful veggies, smart carbs, and
              healthy fats. NutriVision shows how each meal supports your goals.
            </p>
          </div>

          <div style={s.block}>
            <h3 style={s.h3}>Sport & Activity</h3>
            <p style={s.pMuted}>
              Connect Apple Health or Google Fit. Strength + cardio + recovery =
              energy, longevity, and progress.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
