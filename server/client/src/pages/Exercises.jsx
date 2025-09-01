// src/pages/Exercises.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

// EXACT name → local image path (must match the card titles)
const IMG_BY_NAME = {
  "Push-Ups": "/assets/exercises/pushups.jpg",
  "Rowing Machine": "/assets/exercises/rowing.jpg",
  "Dead Bug": "/assets/exercises/deadbug.jpg",
  "Russian Twists": "/assets/exercises/russian-twists.jpg",
  "Goblet Squats": "/assets/exercises/goblet-squats.jpg",
  "Plank": "/assets/exercises/plank.jpg",
  "Jump Rope": "/assets/exercises/jump-rope.jpg",
  "Yoga Flow": "/assets/exercises/yoga-flow.jpg",
  "Indoor Cycling": "/assets/exercises/indoor-cycling.jpg",
};

// keep original image if present, otherwise force the local one
function withImage(x) {
  const img = (x.image || "").trim();
  return { ...x, image: img || IMG_BY_NAME[x.name] || "/assets/exercises/plank.jpg" };
}

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
          const item = withImage(it); // <- force image here
          return (
            <ExerciseCard
              key={it.id}
              item={item}
              onClick={() => setActive(item)}
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
                style={{ backgroundImage: `url(${withImage(active).image})` }} // <- and here
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
