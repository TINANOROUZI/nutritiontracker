// src/pages/Exercises.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

/* ---------- Inline images (generated SVG data URIs) ---------- */
function svgImage(title, subtitle, c1, c2, emoji) {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop stop-color='${c1}' offset='0'/>
        <stop stop-color='${c2}' offset='1'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='55%' font-family='Inter,Segoe UI,Arial' font-size='140'
          fill='rgba(255,255,255,0.9)' text-anchor='middle' font-weight='700'>
      ${emoji ? emoji + " " : ""}${title}
    </text>
    <text x='50%' y='72%' font-family='Inter,Segoe UI,Arial' font-size='64'
          fill='rgba(255,255,255,0.85)' text-anchor='middle'>
      ${subtitle}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const FALLBACK_BY_NAME = {
  "Push-Ups": svgImage("Push-Ups", "Strength • Bodyweight", "#0ea5e9", "#0b1220", "💪"),
  "Rowing Machine": svgImage("Rowing", "Cardio • Machine", "#22c55e", "#0b1220", "🚣"),
  "Dead Bug": svgImage("Dead Bug", "Core • Bodyweight", "#a78bfa", "#0b1220", "🧘"),
  "Russian Twists": svgImage("Russian Twists", "Core", "#f97316", "#0b1220", "🏋️"),
  "Plank": svgImage("Plank", "Core • Bodyweight", "#06b6d4", "#0b1220", "🧘"),
  "Goblet Squats": svgImage("Goblet Squats", "Strength • Dumbbell", "#ef4444", "#0b1220", "🏋️"),
  "Jump Rope": svgImage("Jump Rope", "Cardio • Rope", "#14b8a6", "#0b1220", "🏃"),
};

const FALLBACK_BY_CAT = {
  Cardio: svgImage("Cardio", "Get your heart up", "#06b6d4", "#0b1220", "🏃"),
  Strength: svgImage("Strength", "Lift • Push • Pull", "#ef4444", "#0b1220", "💪"),
  Core: svgImage("Core", "Brace & rotate", "#a3e635", "#0b1220", "🧘"),
  Mobility: svgImage("Mobility", "Stretch & flow", "#f59e0b", "#0b1220", "🤸"),
};

const DEFAULT_IMG = svgImage("Workout", "Let's move ⚡", "#64748b", "#0b0f17", "⚡");

function pickInlineImage(x) {
  const img = (x.image || "").trim();
  if (img) return img; // keep original if provided
  return FALLBACK_BY_NAME[x.name] || FALLBACK_BY_CAT[x.category] || DEFAULT_IMG;
}
/* ------------------------------------------------------------- */

export default function Exercises() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return EXERCISES.filter((x) =>
      (cat === "All" || x.category === cat) &&
      (!term ||
        x.name.toLowerCase().includes(term) ||
        x.muscles.toLowerCase().includes(term) ||
        x.equipment.toLowerCase().includes(term))
    );
  }, [q, cat]);

  return (
    <div className="ex-page">
      <header className="ex-hero">
        <h1>Move your body, fuel your life ⚡</h1>
        <p>Find exercises you love—search by name, muscle group, or equipment.</p>

        <div className="ex-search">
          <input
            placeholder="Search: squat, cardio, dumbbell…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="ex-cats">
            {CATS.map((c) => (
              <button
                key={c}
                className={`chip ${cat === c ? "chip--on" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="ex-grid">
        {list.map((it) => {
          const withImg = { ...it, image: pickInlineImage(it) }; // only addition
          return (
            <ExerciseCard
              key={it.id}
              item={withImg}
              onClick={() => setActive(withImg)}
            />
          );
        })}
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="ex-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="ex-sheet"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="ex-sheet-img"
                style={{ backgroundImage: `url(${pickInlineImage(active)})` }}
              />
              <h3>{active.name}</h3>
              <p className="ex-sheet-sub">
                {active.category} • {active.muscles} • {active.equipment} • {active.difficulty}
              </p>
              <ol className="ex-steps">
                {active.how.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
              <button className="btn-primary" onClick={() => setActive(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
