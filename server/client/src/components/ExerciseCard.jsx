import { motion } from "framer-motion";

// Fallback libraries (used only when the main image is missing/broken)
const NAME_FALLBACKS = {
  "Push-Ups": "https://source.unsplash.com/1600x900/?pushups,fitness,gym",
  "Goblet Squats": "https://source.unsplash.com/1600x900/?goblet,squat,weightlifting",
  "Rowing Machine": "https://source.unsplash.com/1600x900/?rowing,erg,cardio",
  "Dead Bug": "https://source.unsplash.com/1600x900/?core,abs,workout",
};
const CAT_FALLBACKS = {
  Cardio: "https://source.unsplash.com/1600x900/?cardio,fitness",
  Strength: "https://source.unsplash.com/1600x900/?strength,weights,gym",
  Core: "https://source.unsplash.com/1600x900/?core,abs,plank",
  Mobility: "https://source.unsplash.com/1600x900/?stretching,mobility,yoga",
};
const DEFAULT_IMG = "https://source.unsplash.com/1600x900/?fitness,workout";

export default function ExerciseCard({ item, onClick }) {
  const primary = (item.image ?? "").trim();
  const fallbacks = [
    NAME_FALLBACKS[item.name],
    CAT_FALLBACKS[item.category],
    DEFAULT_IMG,
  ].filter(Boolean);

  // If the first URL fails to load, the next one is used automatically.
  const bgLayers = [primary, ...fallbacks]
    .filter(Boolean)
    .map((u) => `url("${u}")`)
    .join(", ");

  return (
    <motion.button
      className="ex-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      onClick={onClick}
    >
      <div className="ex-thumb" style={{ backgroundImage: bgLayers }} />
      <div className="ex-body">
        <div className="ex-title">{item.name}</div>
        <div className="ex-meta">
          <span>{item.category}</span>
          <span>•</span>
          <span>{item.equipment}</span>
        </div>
      </div>
    </motion.button>
  );
}
