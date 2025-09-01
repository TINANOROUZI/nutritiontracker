import { motion } from "framer-motion";

export default function ExerciseCard({ item, onClick }) {
  return (
    <motion.button
      className="ex-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      onClick={onClick}
    >
      <div className="ex-thumb" style={{ backgroundImage: `url(${item.image})` }} />
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
