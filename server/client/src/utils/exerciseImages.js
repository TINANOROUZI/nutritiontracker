// Picks a nice Unsplash cover for an exercise when no image is provided.
// Uses keyword matching (name, bodyPart, target, equipment).

const U = (q) => `https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`;

const MAP = {
  "push up": U("push-up, workout, gym"),
  "pull up": U("pull-up, calisthenics, fitness"),
  "plank": U("plank, core, abs, workout"),
  "squat": U("squat, legs, gym"),
  "goblet squat": U("goblet squat, kettlebell, legs"),
  "lunge": U("lunge, legs workout"),
  "deadlift": U("deadlift, barbell, gym"),
  "bench press": U("bench press, chest, barbell"),
  "shoulder press": U("shoulder press, dumbbell"),
  "bicep curl": U("bicep curl, dumbbell"),
  "tricep": U("tricep dip, triceps, workout"),
  "row": U("rowing machine, row, cardio"),
  "rowing machine": U("rowing machine, cardio, gym"),
  "jump rope": U("jump rope, cardio, fitness"),
  "yoga": U("yoga, flexibility, balance"),
  "pilates": U("pilates, mat workout"),
  "indoor cycling": U("spin bike, indoor cycling"),
  "cycling": U("indoor cycling, bike workout"),
  "running": U("running, treadmill, cardio"),
  "walk": U("walking, steps, cardio"),
  "stair": U("stair climber, cardio"),
  "russian twist": U("russian twist, core, abs"),
  "dead bug": U("dead bug exercise, core rehab"),
  "glute bridge": U("glute bridge, hip thrust"),
  "kettlebell": U("kettlebell, strength"),
  "core": U("abs, core workout"),
  "abs": U("abs, core workout"),
  "back": U("back workout, rows"),
  "legs": U("legs workout, squat"),
  "stretch": U("stretching, flexibility"),
  "mobility": U("mobility, stretching"),
  "cardio": U("cardio, fitness"),
  "bodyweight": U("bodyweight workout, calisthenics"),
  "machine": U("gym machine, workout"),
  "bike": U("spin bike, indoor cycling"),
};

const DEFAULT_IMG = U("fitness, workout, gym");

function normalize(s = "") {
  return String(s).toLowerCase();
}

export function exerciseImageFor(ex = {}) {
  const haystack = [
    ex.name,
    ex.bodyPart,
    ex.target,
    ex.equipment,
  ].filter(Boolean).map(normalize).join(" ");

  // try specific keys first
  for (const [key, url] of Object.entries(MAP)) {
    if (haystack.includes(key)) return url;
  }
  // nothing matched → a nice generic fitness image
  return DEFAULT_IMG;
}
