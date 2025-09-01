import { useMemo, useState } from "react";

/**
 * Compact BMI widget styled like the sample (weight/height panels + unit toggles).
 * - Inline styles only (safe inside your existing Quick BMI card).
 * - Auto converts kg⇄lb and cm⇄in as the user toggles units.
 * - Small footprint: max 560px wide; stacks on mobile.
 * - Emits result via onSubmit (optional).
 */
export default function BMIWidget({ onSubmit }) {
  // values always stored in metric internally
  const [kg, setKg] = useState(60);
  const [cm, setCm] = useState(165);
  const [uW, setUW] = useState("kg"); // 'kg' | 'lb'
  const [uH, setUH] = useState("cm"); // 'cm' | 'in'

  const display = useMemo(() => {
    const w = uW === "kg" ? kg : +(kg * 2.20462).toFixed(1);
    const h = uH === "cm" ? cm : +(cm / 2.54).toFixed(1);
    return { w, h };
  }, [kg, cm, uW, uH]);

  const bmiData = useMemo(() => {
    const hM = cm / 100;
    const bmi = +(kg / (hM * hM)).toFixed(1);
    let cat = "Underweight", color = "#60a5fa";
    if (bmi >= 18.5 && bmi < 25) { cat = "Normal"; color = "#22c55e"; }
    else if (bmi >= 25 && bmi < 30) { cat = "Overweight"; color = "#f59e0b"; }
    else if (bmi >= 30) { cat = "Obesity"; color = "#ef4444"; }
    return { bmi, cat, color };
  }, [kg, cm]);

  // ---------- styles (scoped) ----------
  const card = { maxWidth: 560, margin: "0 auto", display: "grid", gap: 12 };
  const panels = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  };
  const panel = {
    background: "rgba(15,23,42,.9)",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 14,
    padding: 12,
    display: "grid",
    gap: 10,
  };
  const header = {
    background: "#7a0323",
    color: "white",
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 15,
  };
  const toggleWrap = { display: "flex", background: "rgba(255,255,255,.08)", borderRadius: 999, padding: 4, gap: 4, width: "fit-content" };
  const toggleBtn = (on, roundLeft, roundRight) => ({
    padding: "6px 12px",
    borderRadius: roundLeft ? "999px 0 0 999px" : roundRight ? "0 999px 999px 0" : 999,
    background: on ? "#e11d48" : "transparent",
    border: "1px solid rgba(255,255,255,.12)",
    color: "white",
    fontWeight: 700,
    fontSize: 12,
    cursor: "pointer",
  });
  const inputWrap = {
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 12,
    padding: 10,
    display: "grid",
    gap: 6,
  };
  const unitBadge = {
    justifySelf: "start",
    fontSize: 12,
    background: "#e5e7eb22",
    color: "white",
    border: "1px solid rgba(255,255,255,.16)",
    borderRadius: 10,
    padding: "4px 8px",
  };
  const numberInput = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(0,0,0,.25)",
    color: "white",
    outline: "none",
    fontSize: 16,
  };
  const illus = { height: 58, borderRadius: 10, background: "linear-gradient(180deg,#c1ebe0,#96d9c9)", display: "grid", placeItems: "center", color: "#334155", fontWeight: 700, fontSize: 12 };
  const goBtn = {
    background: "#059669",
    border: "1px solid rgba(255,255,255,.18)",
    color: "white",
    fontWeight: 800,
    borderRadius: 999,
    padding: "10px 16px",
    cursor: "pointer",
    justifySelf: "center",
    width: 140,
  };
  const result = {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: 4,
    fontSize: 14,
  };
  const chip = {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.06)",
    fontWeight: 700,
  };

  // mobile stack
  if (typeof window !== "undefined" && window.innerWidth < 560) {
    panels.gridTemplateColumns = "1fr";
  }

  // ---------- handlers ----------
  const setWeightDisplay = (val) => {
    const n = Number(val);
    if (!isFinite(n)) return;
    setKg(uW === "kg" ? n : +(n / 2.20462));
  };
  const setHeightDisplay = (val) => {
    const n = Number(val);
    if (!isFinite(n)) return;
    setCm(uH === "cm" ? n : +(n * 2.54));
  };

  const submit = () => {
    onSubmit?.(bmiData);
  };

  return (
    <div style={card}>
      <div style={panels}>
        {/* Weight panel */}
        <div style={panel}>
          <div style={header}>Enter your weight</div>
          <div style={toggleWrap}>
            <button style={toggleBtn(uW === "kg", true, false)} onClick={() => setUW("kg")}>kg</button>
            <button style={toggleBtn(uW === "lb", false, true)} onClick={() => setUW("lb")}>lb</button>
          </div>
          <div style={inputWrap}>
            <div style={unitBadge}>{uW}</div>
            <input
              type="number"
              min={uW === "kg" ? 20 : 44}
              max={uW === "kg" ? 250 : 550}
              value={display.w}
              onChange={(e) => setWeightDisplay(e.target.value)}
              style={numberInput}
            />
            <div style={illus}>🦶 Scale</div>
          </div>
        </div>

        {/* Height panel */}
        <div style={panel}>
          <div style={header}>Enter your height</div>
          <div style={toggleWrap}>
            <button style={toggleBtn(uH === "cm", true, false)} onClick={() => setUH("cm")}>cm</button>
            <button style={toggleBtn(uH === "in", false, true)} onClick={() => setUH("in")}>in</button>
          </div>
          <div style={inputWrap}>
            <div style={unitBadge}>{uH}</div>
            <input
              type="number"
              min={uH === "cm" ? 80 : 32}
              max={uH === "cm" ? 240 : 95}
              value={display.h}
              onChange={(e) => setHeightDisplay(e.target.value)}
              style={numberInput}
            />
            <div style={illus}>📏 Stadiometer</div>
          </div>
        </div>
      </div>

      {/* CTA + Result */}
      <button style={goBtn} onClick={submit}>Go</button>
      <div style={result}>
        <span style={{ fontWeight: 800, fontSize: 18 }}>{bmiData.bmi}</span>
        <span style={chip}>{bmiData.cat}</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,.10)", overflow: "hidden" }}>
        <div style={{ width: `${Math.max(0, Math.min(100, ((bmiData.bmi - 15) / 25) * 100))}%`, height: "100%", background: bmiData.color }} />
      </div>
    </div>
  );
}
