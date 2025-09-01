import { useMemo, useState } from "react";

/**
 * BMIWidget
 * - Self-contained mini BMI calculator
 * - No external CSS; safe to drop inside your existing "Quick BMI" box
 * - Props are optional. Use defaults if you don’t pass them.
 *
 * Props:
 *   initialHeightCm?: number  // default 165
 *   initialWeightKg?: number  // default 60
 *   onChange?: (data) => void // fires on every recompute
 */
export default function BMIWidget({
  initialHeightCm = 165,
  initialWeightKg = 60,
  onChange,
}) {
  const [cm, setCm] = useState(initialHeightCm);
  const [kg, setKg] = useState(initialWeightKg);

  const data = useMemo(() => {
    const h = Math.max(80, Math.min(240, Number(cm) || 0)) / 100;
    const w = Math.max(20, Math.min(250, Number(kg) || 0));
    const bmiRaw = w && h ? w / (h * h) : 0;
    const bmi = +bmiRaw.toFixed(1);

    let cat = "Underweight";
    let color = "#60a5fa"; // blue
    if (bmi >= 18.5 && bmi < 25) { cat = "Normal";      color = "#22c55e"; } // green
    else if (bmi >= 25 && bmi < 30) { cat = "Overweight";  color = "#f59e0b"; } // amber
    else if (bmi >= 30) { cat = "Obesity";    color = "#ef4444"; } // red

    // Map BMI range 15–40 -> 0–100% for the gauge
    const pct = Math.max(0, Math.min(100, Math.round(((bmi - 15) / 25) * 100)));

    const out = { bmi, cat, color, pct, heightCm: +cm, weightKg: +kg };
    if (onChange) onChange(out);
    return out;
  }, [cm, kg, onChange]);

  // --- Inline styles (scoped) ---
  const wrap = {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: 14,
    alignItems: "center",
  };
  const inputs = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 };
  const label = { fontSize: 12, opacity: 0.8, marginBottom: 4 };
  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(15,23,42,.9)",
    color: "white",
    outline: "none",
  };
  const row = { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" };
  const chip = {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.06)",
    fontWeight: 600,
  };
  const scaleHint = { fontSize: 12, opacity: 0.85 };

  // Circle gauge numbers
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const dash = (data.pct / 100) * C;

  return (
    <div className="bmi-widget" style={wrap}>
      {/* Circular gauge */}
      <div style={{ placeSelf: "center" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,.12)"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={data.color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          {/* Center labels */}
          <g>
            <text
              x="50%"
              y="46%"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{ fill: "#fff", fontWeight: 800, fontSize: 22 }}
            >
              {isFinite(data.bmi) ? data.bmi : 0}
            </text>
            <text
              x="50%"
              y="62%"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{ fill: "rgba(255,255,255,.75)", fontSize: 12 }}
            >
              BMI
            </text>
          </g>
        </svg>
      </div>

      {/* Controls + result */}
      <div style={{ display: "grid", gap: 10 }}>
        <div style={inputs}>
          <label>
            <div style={label}>Height (cm)</div>
            <input
              type="number"
              inputMode="numeric"
              min={80}
              max={240}
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              style={input}
            />
          </label>
          <label>
            <div style={label}>Weight (kg)</div>
            <input
              type="number"
              inputMode="numeric"
              min={20}
              max={250}
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              style={input}
            />
          </label>
        </div>

        <div style={row}>
          <span style={chip}>{data.cat}</span>
          <span style={scaleHint}>15 ← 18.5 • 25 • 30 → 40</span>
        </div>
      </div>
    </div>
  );
}
