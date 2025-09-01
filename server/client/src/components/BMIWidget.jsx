import { useState } from "react";

export default function BmiWidget() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calcBMI = () => {
    if (!height || !weight) return;
    const h = height / 100; // convert cm to m
    const result = (weight / (h * h)).toFixed(1);
    setBmi(result);
  };

  return (
    <div className="bmi-card">
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

      <button className="bmi-btn" onClick={calcBMI}>
        Calculate
      </button>

      <div className="bmi-result">
        {bmi ? <span>{bmi}</span> : <span>--</span>}
      </div>

      <p className="bmi-note">
        BMI is a screening tool. Body composition and health markers matter most.
      </p>
    </div>
  );
}
