import { motion } from "framer-motion";

// map exercise names (lowercase) -> your local files
const LOCAL_BY_NAME = {
  "push-ups": "/assets/exercises/pushups.jpg",
  "rowing machine": "/assets/exercises/rowing.jpg",
  "dead bug": "/assets/exercises/deadbug.jpg",
  "russian twists": "/assets/exercises/russian-twists.jpg",
};

// minimal inline placeholder (never blank)
const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop stop-color='#111827' offset='0'/><stop stop-color='#0b1220' offset='1'/>
    </linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='58%' font-family='Inter,Segoe UI,Arial' font-size='120' fill='rgba(255,255,255,.92)' text-anchor='middle' font-weight='700'>Workout</text>
  </svg>`
)}`;

function resolveImage(item) {
  const orig = (item?.image || "").trim();
  if (orig) return orig;
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
