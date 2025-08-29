import { motion } from "framer-motion";

export default function About(){
  return (
    <motion.section
      className="card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35, ease: "easeOut" }}
    >
      <h2>About NutriVision</h2>
      <p className="muted">
        NutriVision is a full-stack demo that uses a Food-101 image classifier
        (via Hugging Face Inference API) to recognize meals from photos and
        estimate calories & macros using a per-100g nutrition table.
      </p>
      <ul>
        <li>Frontend: React + Vite</li>
        <li>Backend: Node + Express</li>
        <li>ML: <code>nateraw/food</code> model</li>
      </ul>
    </motion.section>
  );
}
