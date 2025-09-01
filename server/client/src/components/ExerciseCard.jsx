import React from "react";

// keyword → photo helper (returns a reliable generic image if none is provided)
const U = (q) =>
  `https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`;

function fallbackFor(item = {}) {
  const name = item.name || "";
  const mix = [name, item.muscles, item.equipment, item.category]
    .filter(Boolean)
    .join(" ");

  // a few helpful biases
  if (/rowing/i.test(mix)) return U("rowing machine, cardio, gym");
  if (/dead\s*bug/i.test(mix)) return U("core rehab exercise, mat");
  if (/russian\s*twist/i.test(mix)) return U("russian twist, core");
  if (/plank/i.test(mix)) return U("plank, core workout");
  if (/squat/i.test(mix)) return U("squat, legs, gym");
  if (/jump\s*rope/i.test(mix)) return U("jump rope, cardio");
  if (/yoga/i.test(mix)) return U("yoga, mat workout");
  if (/cycle|bike/i.test(mix)) return U("indoor cycling, spin bike");

  return U(`${mix} workout fitness`);
}

export default function ExerciseCard({ item, onClick }) {
  const cover = item?.image || fallbackFor(item);

  return (
    <div
      className="ex-card"
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
    >
      <div
        className="ex-thumb"
        style={{ backgroundImage: `url(${cover})` }}
        aria-label={`${item?.name || "Exercise"} thumbnail`}
      />
      <div className="ex-body">
        <h3 className="ex-title">{item?.name || "Exercise"}</h3>
        <div className="ex-meta">
          {item?.category ? <span>{item.category}</span> : null}
          {item?.muscles ? <span> • {item.muscles}</span> : null}
          {item?.equipment ? <span> • {item.equipment}</span> : null}
        </div>
      </div>
    </div>
  );
}
