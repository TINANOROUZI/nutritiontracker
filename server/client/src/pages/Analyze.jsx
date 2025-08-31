// server/client/src/pages/Analyze.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { analyzeImage, computeNutrition, saveHistory } from "../api";

export default function Analyze() {
  // ---------- analyze state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [preds, setPreds] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [grams, setGrams] = useState(150);
  const [calc, setCalc] = useState(null);

  const canAnalyze = useMemo(() => !!file && !loading, [file, loading]);

  // ---------- BMI state
  const [height, setHeight] = useState(""); // cm
  const [weight, setWeight] = useState(""); // kg
  const bmi =
    height && weight ? +(weight / Math.pow(+height / 100, 2)).toFixed(1) : "";

  function bmiMessage(v) {
    if (!v) return "";
    if (v < 18.5) return "Underweight";
    if (v < 25) return "Healthy";
    if (v < 30) return "Overweight";
    return "Obese";
  }

  // ---------- handlers
  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr("");
    setSelected(null);
    setCalc(null);
    setPreds([]);
    setSuggestions([]);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onAnalyze = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setErr("");
      const res = await analyzeImage(file);
      setPreds(res.predictions || []);
      setSuggestions(res.suggestions || []);
      const first = (res.suggestions || []).find((s) => s.nutrition);
      setSelected(first || (res.suggestions || [])[0] || null);
    } catch {
      setErr("Analysis failed. Check the server/token.");
    } finally {
      setLoading(false);
    }
  };

  const onCompute = async () => {
    if (!selected) return;
    try {
      setLoading(true);
      const res = await computeNutrition(selected.key, grams);
      setCalc(res);
    } catch {
      setErr("Could not compute nutrition.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    if (!calc || !selected) return;
    try {
      await saveHistory({
        ts: new Date().toISOString(),
        foodKey: calc.foodKey,
        grams: calc.grams,
        kcal: calc.kcal,
        protein: calc.protein,
        carbs: calc.carbs,
        fat: calc.fat,
        label: selected.rawLabel,
      });
      alert("Saved to history ✅");
    } catch {
      alert("Save failed. You may need to log in.");
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* ---------- Quick Analyze card ---------- */}
      <section className="qa-card">
        <div className="qa-top">
          <label className="file">
            <input type="file" accept="image/*" onChange={onPick} />
            {file ? "Change Photo" : "Upload Meal Photo"}
          </label>
          <button
            className="btn btn-primary"
            disabled={!canAnalyze}
            onClick={onAnalyze}
          >
            {loading ? "Analyzing…" : "Analyze Image"}
          </button>
        </div>

        {preview && (
          <div className="qa-preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        {err && (
          <div className="error" style={{ color: "#ff9c9c", marginTop: 6 }}>
            {err}
          </div>
        )}

        {!!preds.length && (
          <div className="section">
            <h3>Top predictions</h3>
            <div className="chips">
              {preds.map((p, i) => (
                <div key={i} className="chip">
                  {p.label} <span className="tag">{(p.score * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!suggestions.length && (
          <div className="section">
            <h3>Pick the closest food</h3>
            <div className="chips">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className={"chip " + (selected?.key === s.key ? "chip--on" : "")}
                  onClick={() => setSelected(s)}
                  title={s.rawLabel}
                >
                  {s.key} <span className="tag">{(s.score * 100).toFixed(0)}%</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selected && (
          <div className="section">
            <h3>Portion size</h3>
            <div className="slider-row">
              <input
                type="range"
                min="20"
                max="600"
                step="10"
                value={grams}
                onChange={(e) => setGrams(+e.target.value)}
              />
              <span>{grams} g</span>
            </div>
            <button className="btn" onClick={onCompute} disabled={loading}>
              {loading ? "Calculating…" : "Compute Nutrition"}
            </button>
          </div>
        )}

        {calc && (
          <div className="section">
            <h3>Estimated nutrition</h3>
            <div className="metrics">
              <div className="metric">
                <div className="k">Calories</div>
                <div className="v">{calc.kcal} kcal</div>
              </div>
              <div className="metric">
                <div className="k">Protein</div>
                <div className="v">{calc.protein} g</div>
              </div>
              <div className="metric">
                <div className="k">Carbs</div>
                <div className="v">{calc.carbs} g</div>
              </div>
              <div className="metric">
                <div className="k">Fat</div>
                <div className="v">{calc.fat} g</div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onSave}>
              Save to History
            </button>
          </div>
        )}
      </section>

      {/* ---------- BMI widget ---------- */}
      <section className="bmi-card" style={{ marginTop: "12px" }}>
        <h3 style={{ marginTop: 0 }}>Quick BMI</h3>
        <div className="bmi-io">
          <input
            placeholder="Height (cm)"
            inputMode="numeric"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <input
            placeholder="Weight (kg)"
            inputMode="numeric"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="bmi-value" style={{ "--accent": "#60a5fa" }}>
          {bmi || "--"}
        </div>
        <div className="bmi-label">{bmi ? bmiMessage(bmi) : "—"}</div>
        <div className="bmi-tip">
          BMI is a screening tool. Body composition and health markers matter most.
        </div>
      </section>

      {/* ---------- Feature cards (now clickable, with images) ---------- */}
      <div className="features">
        <div className="feature-grid">
          {/* Sync with your devices -> /devices */}
          <Link to="/devices" className="feature pic-left" aria-label="Sync with your devices">
            <div
              className="f-img"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1600&auto=format&fit=crop)",
              }}
            />
            <div className="f-body">
              <div className="f-title">Sync with your devices</div>
              <p>
                Connect Apple Health® and Google Fit™ to automatically sync steps,
                workouts, heart-rate and calories — so your nutrition reflects your
                activity.
              </p>
              <span className="btn btn-ghost">Learn more</span>
            </div>
          </Link>

          {/* Develop healthy habits -> /exercises (with photo) */}
          <Link to="/exercises" className="feature pic-mid" aria-label="Develop healthy habits">
            <div
              className="f-img"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1546484959-f9a53db89f9f?q=80&w=1600&auto=format&fit=crop)",
              }}
            />
            <div className="f-body">
              <div className="f-title">Develop healthy habits</div>
              <p>Find workouts you love and stay motivated.</p>
              <span className="btn btn-primary">Browse exercises</span>
            </div>
          </Link>

          {/* Dial up your diet -> /history */}
          <Link to="/history" className="feature pic-right" aria-label="Dial up your diet">
            <div
              className="f-img"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop)",
              }}
            />
            <div className="f-body">
              <div className="f-title">Dial up your diet</div>
              <p>See saved meals, macros and progress at a glance.</p>
              <span className="btn btn-ghost">Open history</span>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
