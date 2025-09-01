// src/pages/Exercises.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

// --- added: fallback images (used ONLY if item.image is empty/missing) ---
const NAME_FALLBACKS = {
  "Push-Ups": "https://source.unsplash.com/1600x900/?pushups,fitness,gym",
  "Goblet Squats": "https://source.unsplash.com/1600x900/?goblet,squat,weightlifting",
  "Rowing Machine": "https://source.unsplash.com/1600x900/?rowing,erg,cardio",
  "Dead Bug": "https://source.unsplash.com/1600x900/?core,abs,workout",
  "Plank": "https://source.unsplash.com/1600x900/?plank,core,fitness",
  "Russian Twists": "https://source.unsplash.com/1600x900/?russian,twist,abs",
};
const CAT_FALLBACKS = {
  Cardio: "https://source.unsplash.com/1600x900/?cardio,fitness",
  Strength: "https://source.unsplash.com/1600x900/?strength,weights,gym",
  Core: "https://source.unsplash.com/1600x900/?core,abs,workout",
  Mobility: "https://source.unsplash.com/1600x900/?stretching,mobility,yoga",
};
const DEFAULT_IMG = "https://source.unsplash.com/1600x900/?fitness,workout";

function pickImage(x) {
  const img = (x.image || "").trim();
  if (img) return img; // keep your original if present
  return NAME_FALLBACKS[x.name] || CAT_FALLBACKS[x.category] || DEFAULT_IMG;
}
// -----------------------------------------------------------------------

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
          const withImg = { ...it, image: pickImage(it) }; // <-- only addition
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
                style={{ backgroundImage: `url(${pickImage(active)})` }} // uses same fallback
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
