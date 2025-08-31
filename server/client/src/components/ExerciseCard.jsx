// src/components/ExerciseCard.jsx
import React from "react";

// Nice, royalty-free Unsplash fallbacks by category
const FALLBACK_IMG = {
  Cardio:
    "https://images.unsplash.com/photo-1554311884-1736a2c08424?auto=format&fit=crop&w=1600&q=80",
  Strength:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1600&q=80",
  Core:
    "https://images.unsplash.com/photo-1596357395104-023321174449?auto=format&fit=crop&w=1600&q=80",
  Mobility:
    "https://images.unsplash.com/photo-1546484959-f9a53db89f9f?auto=format&fit=crop&w=1600&q=80",
};

// Last-ditch generic photo if category is unknown
const GENERIC_FALLBACK =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80";

export default function ExerciseCard({ item, onClick }) {
  const img =
    (item.image && item.image.trim()) ||
    FALLBACK_IMG[item.category] ||
    GENERIC_FALLBACK;

  // Some datasets use different keys; normalize for safety
  const equipment = item.equipment || item.tool || "Bodyweight";

  return (
    <article className="ex-card" onClick={onClick} role="button" tabIndex={0}>
      <div
        className="ex-thumb"
        aria-label={`${item.name} image`}
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="ex-body">
        <div className="ex-title">{item.name}</div>
        <div className="ex-meta">
          {item.category} • {item.muscles} • {equipment}
        </div>
      </div>
    </article>
  );
}
