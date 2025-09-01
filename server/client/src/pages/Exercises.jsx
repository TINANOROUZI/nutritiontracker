import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

// same resolver for the modal (uses your local files or a safe placeholder)
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
  `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'><rect width='100%' height='100%' fill='#0b1220'/></svg>`
)}`;
const resolveImage = (x) =>
  (x?.image || "").trim() ||
  LOCAL_BY_NAME[(x?.name || "").toLowerCase().trim()] ||
  PLACEHOLDER;

function TipCard({ title, points }) {
  return (
    <div style={{
      background: "rgba(15,23,42,.96)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: 14,
      padding: 14
    }}>
      <h4 style={{ margin: "0 0 8px" }}>{title}</h4>
      <ul style={{ margin: 0, paddingLeft: 18, opacity: .9 }}>
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
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

  // --- NEW PAGE LAYOUT (EatRight-style: hero + two columns) ---
  return (
    // keeps your site background; container only changes spacing
    <div className="ex-page" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 80px" }}>
      <header className="ex-hero" style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 30 }}>Exercise & Nutrition</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Fuel smart. Move better. Recover well.
        </p>
      </header>

      {/* search + filters */}
      <div style={{ display: "grid", gap: 16, justifyItems: "center", marginBottom: 12 }}>
        <input
          placeholder="Search: squat, cardio, dumbbell…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 560,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(15,23,42,.96)",
            color: "white",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {CATS.map((c) => (
            <button
              key={c}
              className={`chip ${cat === c ? "chip--on" : ""}`}
              onClick={() => setCat(c)}
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.14)",
                background: cat === c ? "#1f2937" : "transparent",
                color: "white",
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column content: left = exercises grid, right = nutrition sidebar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2.1fr 1fr",
        gap: 22,
      }}>
        {/* LEFT: exercises grid */}
        <section
          className="ex-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {list.map((it) => (
            <ExerciseCard key={it.id} item={it} onClick={() => setActive(it)} />
          ))}
        </section>

        {/* RIGHT: nutrition/tips sidebar (like EatRight) */}
        <aside style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <TipCard
            title="Before your workout"
            points={[
              "Eat a balanced meal 2–3 hours before (carbs + protein).",
              "If short on time, have a light snack 30–60 min before.",
              "Sip 300–500 ml water in the hour leading up.",
            ]}
          />
          <TipCard
            title="During workout"
            points={[
              "Water first choice; long intense sessions may need electrolytes.",
              "For >60–90 min cardio, add 30–60 g carbs per hour.",
            ]}
          />
          <TipCard
            title="After workout"
            points={[
              "Aim for 20–30 g protein + carbs within 1–2 hours.",
              "Rehydrate: 1–1.5× weight lost in fluids.",
              "Prioritize sleep for recovery.",
            ]}
          />
          <div style={{
            background: "rgba(15,23,42,.96)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 14,
            padding: 14
          }}>
            <h4 style={{ marginTop: 0 }}>Quick snack ideas</h4>
            <ul style={{ margin: 0, paddingLeft: 18, opacity: .9 }}>
              <li>Greek yogurt + fruit</li>
              <li>Banana + peanut butter</li>
              <li>Tuna on whole-grain toast</li>
              <li>Chocolate milk</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="ex-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,.6)",
              display: "grid", placeItems: "center", zIndex: 50,
            }}
          >
            <motion.div
              className="ex-sheet"
              initial={{ y: 40, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(900px, 92vw)",
                background: "rgba(15,23,42,.98)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 12px 48px rgba(0,0,0,.45)",
              }}
            >
              <div style={{ height: 360, background: "#0b1220" }}>
                <img
                  src={resolveImage(active)}
                  alt={active.name}
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                  loading="eager"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: 18 }}>
                <h3 style={{ margin: "6px 0 8px" }}>{active.name}</h3>
                <p className="ex-sheet-sub" style={{ opacity: 0.85, marginTop: 0 }}>
                  {active.category} • {active.muscles} • {active.equipment} • {active.difficulty}
                </p>
                <ol className="ex-steps" style={{ paddingLeft: 18, marginTop: 12 }}>
                  {active.how.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
                <button
                  className="btn-primary"
                  onClick={() => setActive(null)}
                  style={{
                    marginTop: 16, padding: "10px 14px", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.14)", background: "#1f2937",
                    color: "white", cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
