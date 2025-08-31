// server/client/src/components/ExerciseCard.jsx
import React from "react";

// Simple category → photo fallbacks (royalty-free Unsplash)
const FALLBACKS = {
  Cardio:
    "https://images.unsplash.com/photo-1546484959-f9a53db89f9f?q=80&w=1600&auto=format&fit=crop",
  Strength:
    "https://images.unsplash.com/photo-1517963628607-235ccdd5476b?q=80&w=1600&auto=format&fit=crop",
  Core:
    "https://images.unsplash.com/photo-1518459031867-a89b944bffe0?q=80&w=1600&auto=format&fit=crop",
  Mobility:
    "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?q=80&w=1600&auto=format&fit=crop",
  default:
    "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1600&auto=format&fit=crop",
};

function fallbackImage(item) {
  return FALLBACKS[item?.category] || FALLBACKS.default;
}

export default function ExerciseCard({ item, onClick }) {
  const img =
    item?.image && item.image.trim() !== "" ? item.image : fallbackImage(item);

  return (
    <div
      className="ex-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="ex-thumb" style={{ backgroundImage: `url(${img})` }} />
      <div className="ex-body">
        <div className="ex-title">{item.name}</div>
        <div className="ex-meta">
          {item.category}
          {item.muscles ? " • " + item.muscles : ""}
          {item.equipment ? " • " + item.equipment : ""}
        </div>
      </div>
    </div>
  );
}
