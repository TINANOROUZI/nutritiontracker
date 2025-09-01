import { useMemo, useState } from "react";

export default function BmiMini() {
  const [cm, setCm] = useState(165);
  const [kg, setKg] = useState(60);

  const data = useMemo(() => {
    const h = Math.max(80, Math.min(240, +cm || 0)) / 100;
    const w = Math.max(20, Math.min(250, +kg || 0));
    const bmi = +(w / (h * h)).toFixed(1);

    let cat = "Underweight", color = "#60a5fa";
    if (bmi >= 18.5 && bmi < 25) { cat = "Normal"; color = "#22c55e"; }
    else if (bmi >= 25 && bmi < 30) { cat = "Overweight"; color = "#f59e0b"; }
    else if (bmi >= 30) { cat = "Obesity"; color = "#ef4444"; }

    // map BMI 15–40 → 0–100%
    const pct = Math.max(0, Math.min(100, Math.round(((bmi - 15) / 25) * 100)));
    return { bmi: isFinite(bmi) ? bmi : 0, cat, color, pct };
  }, [cm, kg]);

  // layout keeps to your card; internal styles only
  const wrap = { display: "grid", gridTemplateColumns: "120px 1fr", gap: 14 };
  const inputs = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 };
  const label = { fontSize: 12, opacity: 0.8, marginBottom: 4 };
  const input = {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,.12)", background: "rgba(15,23,42,.9)",
    color: "white", outline: "none",
  };

  // circle gauge
  const size = 120, stroke = 10;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const dash = (data.pct / 100) * C;

  return (
    <div style={wrap}>

      {/* Circular gauge */}
      <div style={{ placeSelf: "center" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="bmiGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,.05)" />
            </linearGradient>
          </defs>

          {/* track */}
          <circle
            cx={size/2} cy={size/2} r={r}
            stroke="rgba(255,255,255,.12)" strokeWidth={stroke}
            fill="none"
          />
          {/* progress */}
          <circle
            cx={size/2} cy={size/2} r={r}
            stroke={data.color} strokeWidth={stroke}
            fill="none" strokeLinecap="round"
            strokeDasharray={`${dash} ${C - dash}`}
            transform={`rotate(-90 ${size/2} ${size/2})`}
          />
          {/* center value */}
          <g>
            <text x="50%" y="46%" dominantBaseline="middle" textAnchor="middle"
                  style={{ fill: "#fff", fontWeight: 800, fontSize: 22 }}>
              {data.bmi}
            </text>
            <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
                  style={{ fill: "rgba(255,255,255,.75)", fontSize: 12 }}>
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
            <input type="number" min={80} max={240} value={cm}
                   onChange={(e) => setCm(e.target.value)} style={input} />
          </label>
          <label>
            <div style={label}>Weight (kg)</div>
            <input type="number" min={20} max={250} value={kg}
                   onChange={(e) => setKg(e.target.value)} style={input} />
          </label>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
        }}>
          <span style={{
            padding: "6px 10px", borderRadius: 999,
            border: "1px solid rgba(255,255,255,.14)",
            background: "rgba(255,255,255,.06)", fontWeight: 600
          }}>
            {data.cat}
          </span>
          <div style={{ fontSize: 12, opacity: .85 }}>
            15 ← under • 18.5 • 25 • 30 • 40 →
          </div>
        </div>
      </div>
    </div>
  );
}
