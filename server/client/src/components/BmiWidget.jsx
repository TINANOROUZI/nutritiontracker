// src/components/BMIWidget.jsx
import React, { useMemo, useState } from "react";

export default function BMIWidget() {
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(65);  // kg

  const { bmi, category } = useMemo(() => {
    const h = Math.max(100, Math.min(230, Number(height) || 0));
    const w = Math.max(30, Math.min(250, Number(weight) || 0));
    const m = h / 100;
    const b = +(w / (m * m)).toFixed(1);
    let c = "Normal";
    if (b < 18.5) c = "Underweight";
    else if (b < 25) c = "Normal";
    else if (b < 30) c = "Overweight";
    else c = "Obese";
    return { bmi: b, category: c };
  }, [height, weight]);

  return (
    <section className="card bmi-card">
      <h2 className="card-title">Quick BMI</h2>

      <div className="bmi-row">
        <label>
          Height
          <div className="bmi-input">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min={100}
              max={230}
            />
            <span>cm</span>
          </div>
        </label>

        <label>
          Weight
          <div className="bmi-input">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min={30}
              max={250}
            />
            <span>kg</span>
          </div>
        </label>
      </div>

      <div className="bmi-result">
        <div className="bmi-number">{bmi}</div>
        <div className="bmi-cat">{category}</div>
      </div>

      <p className="bmi-note">
        BMI is a quick screening metric. Pair it with your meals & activity for
        a fuller picture.
      </p>
    </section>
  );
}
