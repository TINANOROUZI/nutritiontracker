import { useEffect, useMemo, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import { EXERCISES } from "../data/exercises";

const CATS = ["All", "Cardio", "Strength", "Core", "Mobility"];

export default function Exercises() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  // --- Photo fallbacks (only used when item.image is missing) ---
  const U = (q) =>
    `https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`;

  const FALLBACKS = [
    ["rowing machine", U("rowing machine, cardio, gym")],
    ["row", U("rowing machine, cardio")],
    ["dead bug", U("core rehab exercise, mat")],
    ["russian twist", U("russian twist, core, abs")],
    ["push-up", U("push-up, calisthenics")],
    ["push up", U("push-up, workout")],
    ["plank", U("plank, core workout")],
    ["goblet squat", U("goblet squat, kettlebell")],
    ["squat", U("squat, legs, gym")],
    ["jump rope", U("jump rope, cardio")],
    ["yoga", U("yoga, mat, flexibility")],
    ["indoor cycling", U("spin bike, indoor cycling")],
    ["cycling", U("indoor cycling, bike workout")],
    ["glute bridge", U("glute bridge, hip thrust")],
    ["lunge", U("lunge, legs")],
    ["curl", U("bicep curl, dumbbell")],
    ["press", U("shoulder press, dumbbell")],
    ["core", U("abs, core workout")],
    ["cardio", U("cardio, fitness")],
    ["bodyweight", U("bodyweight workout")],
  ];
  const DEFAULT_IMG = U("fitness, workout, gym");

  const fallbackFor = (item = {}) => {
    const hay = [
      item.name,
      item.muscles,
      item.equipment,
      item.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    for (const [key, url] of FALLBACKS) {
      if (hay.includes(key)) return url;
    }
    return DEFAULT_IMG;
  };
  // -------------------------------------------------------------

  // Filtered list
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

  // Enrich with images where missing (does not change original EXERCISES)
  const enriched = useMemo(
    () =>
      list.map((x) => ({
        ...x,
        image: x.image || fallbackFor(x),
      })),
    [list]
  );

  // Close modal on ESC, and lock scroll while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="ex-page">
      {/* Hero with photo */}
      <header className="ex-hero">
        <div
          className="f-img"
          style={{
            borderRadius: 14,
            marginBottom: 12,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1600&auto=format&fit=crop)",
          }}
        />
        <h1>Move your body, fuel your life ⚡</h1>
        <p className="muted">
          Find exercises you love—search by name, muscle group, or equipment.
        </p>

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
                className={`chip chip--cat ${cat === c ? "chip--on" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="muted" style={{ marginTop: 6 }}>
            Showing <strong>{enriched.length}</strong> of {EXERCISES.length}
          </div>
        </div>
      </header>

      {/* Results */}
      {enriched.length === 0 ? (
        <div
          className="qa-card"
          style={{ textAlign: "center", marginTop: 10, padding: "1.2rem" }}
        >
          <h3 style={{ marginTop: 0 }}>No matches</h3>
          <p className="muted" style={{ marginTop: 4 }}>
            Try a different search term or switch categories.
          </p>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="btn" onClick={() => setQ("")}>
              Clear search
            </button>
            <button className="btn" onClick={() => setCat("All")}>
              All categories
            </button>
          </div>
        </div>
      ) : (
        <section className="ex-grid">
          {enriched.map((it) => (
            <ExerciseCard
              key={it.id}
              item={it}
              onClick={() => setActive(it)} // pass enriched item so modal has image
            />
          ))}
        </section>
      )}

      {/* Modal */}
      {active && (
        <div className="ex-modal" onClick={() => setActive(null)}>
          <div className="ex-sheet" onClick={(e) => e.stopPropagation()}>
            <div
              className="ex-sheet-img"
              style={{
                backgroundImage: `url(${active.image || fallbackFor(active)})`,
              }}
            />
            <h3 style={{ margin: "0 0 .2rem" }}>{active.name}</h3>
            <p className="ex-sheet-sub">
              {active.category} • {active.muscles} • {active.equipment} •{" "}
              {active.difficulty}
            </p>
            <ol className="ex-steps">
              {active.how.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <button className="btn btn-primary" onClick={() => setActive(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
