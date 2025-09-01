// src/components/BmiMini.jsx
import { useMemo, useState } from "react";

export default function BmiMini() {
  const [cm, setCm] = useState(165);
  const [kg, setKg] = useState(60);

  const { bmi, cat, tip, pct, color } = useMemo(() => {
    const h = Math.max(80, Math.min(240, Number(cm) || 0)) / 100;
    const w = Math.max(20, Math.min(250, Number(kg) || 0));
    const v = +(w / (h * h)).toFixed(1);

    // WHO categories
    let c = "Underweight", t = "Add balanced calories & strength work.", p = 8, col = "#60a5fa";
    if (v >= 18.5 && v < 25) { c = "Normal"; t = "Great! Maintain with smart habits."; p = 35; col = "#22c55e"; }
    else if (v >= 25 && v < 30) { c = "Overweight"; t = "Focus on small daily deficits + activity."; p = 60; col = "#f59e0b"; }
    else if (v >= 30) { c = "Obesity"; t = "Prioritize nutrition quality & steady activity."; p = 85; col = "#ef4444"; }

    // map bmi (15 → 0%, 40 → 100%)
    const pctClip = Math.max(0, Math.min(100, Math.round(((v - 15) / 25) * 100)));
    return { bmi: isFinite(v) ? v : 0, cat: c, tip: t, pct: pctClip, color: col };
  }, [cm, kg]);

  // scoped styles so nothing outside changes
  const wrap = {
    display: "grid",
    gap: 12,
    fontSize: 14,
  };
  const row = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 };
  const lbl = { fontSize: 12, opacity: .85, marginBottom: 6 };
  const inp = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(15,23,42,.9)",
    color: "white",
    outline: "none",
  };
  const pill = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(0,0,0,.25)",
    backdropFilter: "blur(4px)",
  };
  const score = { fontWeight: 800, fontSize: 20 };
  const catChip = {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.12)",
    fontWeight: 600,
  };
  const barWrap = {
    height: 10,
    borderRadius: 999,
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.10)",
    overflow: "hidden",
  };
  const bar = {
    width: `${pct}%`,
    height: "100%",
    background: color,
    transition: "width .25s ease",
  };
  const ranges = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    opacity: .8,
  };

  return (
    <div className="bmi-mini" style={wrap}>
      {/* Inputs */}
      <div style={row}>
        <label>
          <div style={lbl}>Height (cm)</div>
          <input
            type="number"
            inputMode="numeric"
            min={80}
            max={240}
            value={cm}
            onChange={(e) => setCm(e.target.value)}
            style={inp}
          />
        </label>
        <label>
          <div style={lbl}>Weight (kg)</div>
          <input
            type="number"
            inputMode="numeric"
            min={20}
            max={250}
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            style={inp}
          />
        </label>
      </div>

      {/* Result pill */}
      <div style={pill}>
        <span style={score}>{bmi}</span>
        <span style={{ opacity: .8 }}>BMI</span>
        <span style={catChip}>{cat}</span>
      </div>

      {/* Gauge */}
      <div style={barWrap}><div style={bar} /></div>
      <div style={ranges}>
        <span>15</span><span>20</span><span>25</span><span>30</span><span>35</span><span>40</span>
      </div>

      {/* Tip */}
      <div style={{ fontSize: 12, opacity: .9 }}>{tip}</div>
    </div>
  );
}
