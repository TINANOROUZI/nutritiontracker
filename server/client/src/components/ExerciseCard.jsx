import { motion } from "framer-motion";

// exact local paths for your uploaded files (match by exercise name, case-insensitive)
const LOCAL_BY_NAME = {
  "push-ups": "/assets/exercises/pushups.jpg",
  "rowing machine": "/assets/exercises/rowing.jpg",
  "dead bug": "/assets/exercises/deadbug.jpg",
  "russian twists": "/assets/exercises/russian-twists.jpg",
  "goblet squats": "/assets/exercises/goblet-squats.jpg",
  "plank": "/assets/exercises/plank.jpg",
  "jump rope": "/assets/exercises/jump-rope.jpg",
  "yoga flow": "/assets/exercises/yoga-flow.jpg",
  "indoor cycling": "/assets/exercises/indoor-cycling.jpg",
};

// tiny fallback so a card is never blank
const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
     <rect width='100%' height='100%' fill='#0b1220'/>
   </svg>`
)}`;

function resolveImage(item) {
  const orig = (item?.image || "").trim();
  if (orig) return orig; // keep image if provided in data
  const key = (item?.name || "").toLowerCase().trim();
  return LOCAL_BY_NAME[key] || PLACEHOLDER;
}

export default function ExerciseCard({ item, onClick }) {
  const img = resolveImage(item);

  return (
    <motion.button
      className="ex-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      onClick={onClick}
    >
      <div className="ex-thumb" style={{ backgroundImage: `url(${img})` }} />
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
