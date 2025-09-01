import React from "react";
import { exerciseImageFor } from "../utils/exerciseImages";

export default function ExerciseCard({ exercise, onClick }) {
  const {
    name = "Exercise",
    bodyPart,
    target,
    equipment,
    image,
    gifUrl,
  } = exercise || {};

  // Prefer provided image → gifUrl → smart fallback
  const cover = image || gifUrl || exerciseImageFor(exercise);

  return (
    <div className="ex-card" onClick={() => onClick?.(exercise)} role="button" tabIndex={0}>
      <div
        className="ex-thumb"
        style={{ backgroundImage: `url(${cover})` }}
        aria-label={`${name} thumbnail`}
      />
      <div className="ex-body">
        <h3 className="ex-title">{name}</h3>
        <div className="ex-meta">
          {bodyPart ? <span>{bodyPart}</span> : null}
          {target ? <span>• {target}</span> : null}
          {equipment ? <span>• {equipment}</span> : null}
        </div>
      </div>
    </div>
  );
}
