import React, { useMemo, useState } from "react";
import { analyzeImage, computeNutrition, saveHistory } from "../api";
import { motion } from "framer-motion";

export default function Analyze(){
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [preds, setPreds] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(150);
  const [calc, setCalc] = useState(null);

  const onPick = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(""); setSelected(null); setCalc(null);
    setPreds([]); setSuggestions([]);
    setFile(f); setPreview(URL.createObjectURL(f));
  };

  const onAnalyze = async () => {
    if (!file) return;
    try {
      setLoading(true); setErr("");
      const res = await analyzeImage(file);
      setPreds(res.predictions || []);
      setSuggestions(res.suggestions || []);
      const first = (res.suggestions || []).find(s => s.nutrition);
      setSelected(first || (res.suggestions || [])[0] || null);
    } catch {
      setErr("Analysis failed. Check the server/token.");
    } finally { setLoading(false); }
  };

  const onCompute = async () => {
    if (!selected) return;
    try {
      setLoading(true);
      const res = await computeNutrition(selected.key, grams);
      setCalc(res);
    } catch {
      setErr("Could not compute nutrition.");
    } finally { setLoading(false); }
  };

  const onSave = async () => {
    if (!calc || !selected) return;
    await saveHistory({
      ts: new Date().toISOString(),
      foodKey: calc.foodKey, grams: calc.grams,
      kcal: calc.kcal, protein: calc.protein, carbs: calc.carbs, fat: calc.fat,
      label: selected.rawLabel
    });
    alert("Saved to history ✅");
  };

  const canAnalyze = useMemo(()=> !!file && !loading, [file, loading]);

  return (
    <motion.section
      className="card grid"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35, ease: "easeOut" }}
    >
      <div className="panel">
        <label className="btn">
          <input type="file" accept="image/*" onChange={onPick} hidden />
          {file ? "Change Photo" : "Upload Meal Photo"}
        </label>
        {preview && <img className="preview" src={preview} alt="preview" />}
      </div>

      <div className="panel">
        <button className="btn primary" disabled={!canAnalyze} onClick={onAnalyze}>
          {loading ? "Analyzing…" : "Analyze Image"}
        </button>
        {err && <div className="error">{err}</div>}

        {!!preds.length && (
          <div className="section">
            <h3>Top predictions</h3>
            <ul className="chips">
              {preds.map((p,i)=>(
                <li key={i} className="chip">{p.label} <span className="tag">{(p.score*100).toFixed(1)}%</span></li>
              ))}
            </ul>
          </div>
        )}

        {!!suggestions.length && (
          <div className="section">
            <h3>Pick the closest food</h3>
            <div className="options">
              {suggestions.map((s,i)=>(
                <button key={i}
                  className={"opt " + (selected?.key===s.key?"active":"")}
                  onClick={()=>setSelected(s)} title={s.rawLabel}>
                  {s.key} <span className="tag">{(s.score*100).toFixed(0)}%</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selected && (
          <div className="section">
            <h3>Portion size</h3>
            <div className="row">
              <input type="range" min="20" max="600" step="10"
                     value={grams} onChange={e=>setGrams(+e.target.value)} />
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
            <div className="stats">
              <div className="stat"><div className="k">Calories</div><div className="v">{calc.kcal} kcal</div></div>
              <div className="stat"><div className="k">Protein</div><div className="v">{calc.protein} g</div></div>
              <div className="stat"><div className="k">Carbs</div><div className="v">{calc.carbs} g</div></div>
              <div className="stat"><div className="k">Fat</div><div className="v">{calc.fat} g</div></div>
            </div>
            <button className="btn success" onClick={onSave}>Save to History</button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
