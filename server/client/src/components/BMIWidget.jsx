import { useMemo, useState } from "react";

export default function BMIWidget() {
  const [height, setHeight] = useState(""); // cm
  const [weight, setWeight] = useState(""); // kg

  const bmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    const v = w / ((h / 100) ** 2);
    return Math.round(v * 10) / 10; // 1 decimal
  }, [height, weight]);

  const label =
    bmi == null
      ? ""
      : bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Healthy"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  const tip =
    bmi == null
      ? "BMI is a screening tool. Body composition and health markers matter most."
      : label === "Healthy"
      ? "Nice! Keep up consistent meals, protein, and daily movement."
      : "Use BMI as a rough guide — focus on steady habits and nutrition.";

  return (
    <section className="card bmi-card">
      <h2 className="card-title">Quick BMI</h2>

      {/* The class names below are what crono.css expects */}
      <div className="bmi-io">
        <input
          type="number"
          inputMode="decimal"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          inputMode="decimal"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="bmi-value" aria-live="polite">
        {bmi == null ? "--" : bmi}
      </div>

      <div className="bmi-label">{label}</div>
      <div className="bmi-tip">{tip}</div>
    </section>
  );
}
