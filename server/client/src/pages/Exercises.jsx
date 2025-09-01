import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

/* Local images you uploaded (exact exercise names) */
const LOCAL_IMG_BY_NAME = {
  "Push-Ups": "/assets/exercises/pushups.jpg",
  "Rowing Machine": "/assets/exercises/rowing.jpg",
  "Dead Bug": "/assets/exercises/deadbug.jpg",
  "Russian Twists": "/assets/exercises/russian-twists.jpg",
  "Goblet Squats": "/assets/exercises/goblet-squats.jpg", // Added
  "Jump Rope": "/assets/exercises/jump-rope.jpg", // Added
  "Yoga Flow": "/assets/exercises/yoga-flow.jpg", // Added
  "Indoor Cycling": "/assets/exercises/indoor-cycling.jpg", // Added
};

/* Tiny built-in fallback so you always see *something* even if a name doesn't match */
const DEFAULT_PLACEHOLDER = data:image/svg+xml;utf8,${encodeURIComponent(
  <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop stop-color='#1f2937' offset='0'/><stop stop-color='#0b1220' offset='1'/>
    </linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='55%' font-family='Inter,Segoe UI,Arial' font-size='120'
          fill='rgba(255,255,255,.92)' text-anchor='middle' font-weight='700'>
      Workout
    </text>
    <text x='50%' y='72%' font-family='Inter,Segoe UI,Arial' font-size='56'
          fill='rgba(255,255,255,.85)' text-anchor='middle'>Let’s move ⚡️</text>
  </svg>
)};

/** Use original image if present, else your local file, else a tiny placeholder */
function pickImage(x) {
  const original = (x.image || "").trim();
  if (original) return original;
  return LOCAL_IMG_BY_NAME[x.name] || DEFAULT_PLACEHOLDER;
}

export default function Exercises() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return EXERCISES.filter(
      (x) =>
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
        <h1>Move your body, fuel your life ⚡️</h1>
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
                className={chip ${cat === c ? "chip--on" : ""}}
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
          const withImg = { ...it, image: pickImage(it) };
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
                style={{ backgroundImage: url(${pickImage(active)}) }}
              />
              <h3>{active.name}</h3>
              <p className="ex-sheet-sub">
                {active.category} • {active.muscles} • {active.equipment}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
