import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

// same resolver for the modal image
const LOCAL_BY_NAME = {
  "push-ups": "/assets/exercises/pushups.jpg",
  "rowing machine": "/assets/exercises/rowing.jpg",
  "dead bug": "/assets/exercises/deadbug.jpg",
  "russian twists": "/assets/exercises/russian-twists.jpg",
  "goblet squats": "/assets/exercises/goblet-squats.jpg",
  "plank": "/assets/exercises/plank.jpg",
  "jump rope": "/assets/exercises/jump-rope.jpg",
  "yoga flow": "/assets/exercises/yoga-flow.jpg",
  "indoor cycling": "/assets/exercises/indoor-cycling.jpg",
};
const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
     <rect width='100%' height='100%' fill='#0b1220'/>
   </svg>`
)}`;
const resolveImage = (x) =>
  (x?.image || "").trim() ||
  LOCAL_BY_NAME[(x?.name || "").toLowerCase().trim()] ||
  PLACEHOLDER;

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
        {list.map((it) => (
          <ExerciseCard key={it.id} item={it} onClick={() => setActive(it)} />
        ))}
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
                style={{ backgroundImage: `url(${resolveImage(active)})` }}
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
