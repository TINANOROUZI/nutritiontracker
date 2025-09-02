import { useState } from "react";

function mapAngle(bmi) {
  const min = 14, max = 40;                   // clamp to sensible range
  const pct = Math.max(0, Math.min(1, (bmi - min) / (max - min)));
  return Math.round(pct * 360);
}
function categorize(bmi) {
  if (bmi == null || Number.isNaN(bmi)) return { key: "", label: "—" };
  if (bmi < 18.5)   return { key: "uw", label: "Underweight" };
  if (bmi < 25)     return { key: "ok", label: "Healthy" };
  if (bmi < 30)     return { key: "ow", label: "Overweight" };
  return { key: "ob", label: "Obese" };
}

export default function BmiWidget() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calcBMI = () => {
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w) { setBmi(null); return; }
    const m = h / 100;
    const val = +(w / (m * m)).toFixed(1);
    setBmi(val);
  };

  const cat = categorize(bmi);
  const angle = bmi ? mapAngle(bmi) : 0;

  return (
    <div className={`bmi-card bmi--${cat.key || "none"}`}>
      <h2 className="bmi-title">Quick BMI</h2>

      <div className="bmi-inputs">
        <div className="input-box">
          <div className="icon">⚖️</div>
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="input-box">
          <div className="icon">📏</div>
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <button className="bmi-btn" onClick={calcBMI}>Calculate</button>

      {/* Modern result tile */}
      <div className="bmi-result" style={{ ["--angle"]: `${angle}deg` }}>
        <span>{bmi ? bmi.toFixed(1) : "--"}</span>
      </div>

      {/* Category chip */}
      <div className="bmi-chip">{cat.label}</div>

      <p className="bmi-note">
        BMI is a screening tool. Body composition and health markers matter most.
      </p>
    </div>
  );
}
