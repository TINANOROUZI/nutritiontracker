import { motion } from "framer-motion";
import { useMemo, useState } from "react";

// Map exercise names → your local files (keys are lowercase)
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

// Tiny built-in placeholder so a card is never blank
const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
     <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
       <stop stop-color='#151c2c' offset='0'/><stop stop-color='#0b1220' offset='1'/>
     </linearGradient></defs>
     <rect width='100%' height='100%' fill='url(#g)'/>
   </svg>`
)}`;

function pickSrc(item) {
  const orig = (item?.image || "").trim();
  if (orig) return orig;
  const key = (item?.name || "").toLowerCase().trim();
  return LOCAL_BY_NAME[key] || PLACEHOLDER;
}

export default function ExerciseCard({ item, onClick }) {
  const initial = useMemo(() => pickSrc(item), [item]);
  const [src, setSrc] = useState(initial);

  // NEW visual (keeps your background; only the card styling changes)
  return (
    <motion.button
      className="ex-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      style={{
        background: "rgba(15,23,42,.96)",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 16,
        padding: 12,
        textAlign: "left",
        boxShadow: "0 6px 24px rgba(0,0,0,.25)",
      }}
    >
      <figure
        style={{
          height: 220,
          borderRadius: 12,
          overflow: "hidden",
          margin: 0,
          background: "#0b1220",
        }}
      >
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          onError={() => setSrc(PLACEHOLDER)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </figure>

      <div style={{ padding: "12px 8px 6px" }}>
        <div className="ex-title" style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
          {item.name}
        </div>
        <div className="ex-meta" style={{ opacity: 0.8 }}>
          <span>{item.category}</span>
          <span style={{ padding: "0 8px" }}>•</span>
          <span>{item.equipment}</span>
        </div>
      </div>
    </motion.button>
  );
}
