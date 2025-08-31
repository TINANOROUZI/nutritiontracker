// server/client/src/components/ExerciseCard.jsx
import React from "react";

const FALLBACKS = {
  Cardio:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
  Strength:
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1600&auto=format&fit=crop",
  Core:
    "https://images.unsplash.com/photo-1592432678016-e910b452f9a5?q=80&w=1600&auto=format&fit=crop",
  Mobility:
    "https://images.unsplash.com/photo-1540206276207-3af25c08abc8?q=80&w=1600&auto=format&fit=crop",
  Default:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
};

function pickFallback(category) {
  if (!category) return FALLBACKS.Default;
  return FALLBACKS[category] || FALLBACKS.Default;
}

export default function ExerciseCard({ item, onClick }) {
  const img =
    item?.image && item.image.trim().length > 0
      ? item.image
      : pickFallback(item?.category);

  return (
    <div
      className="ex-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      aria-label={`${item?.name} details`}
    >
      {/* subtle top-to-bottom gradient over the image to avoid washed-out look */}
      <div
        className="ex-thumb"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.25)), url(${img})`,
        }}
      />
      <div className="ex-body">
        <div className="ex-title">{item?.name || "Exercise"}</div>
        <div className="ex-meta">
          {item?.category || "—"} • {item?.muscles || "—"}
          {item?.equipment ? <> • {item.equipment}</> : null}
        </div>
      </div>
    </div>
  );
}
