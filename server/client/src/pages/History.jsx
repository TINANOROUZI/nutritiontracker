import React, { useEffect, useState } from "react";
import { getHistory } from "../api";
import { motion } from "framer-motion";

export default function History(){
  const [history, setHistory] = useState([]);
  useEffect(()=>{ getHistory().then(setHistory).catch(()=>{}); },[]);

  return (
    <motion.section
      className="card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35, ease: "easeOut" }}
    >
      {!history.length && <p className="muted">No entries yet.</p>}
      {!!history.length && (
        <table className="history">
          <thead><tr><th>Date</th><th>Food</th><th>Grams</th><th>kcal</th><th>P</th><th>C</th><th>F</th></tr></thead>
          <tbody>
            {history.map(h=>(
              <tr key={h.id}>
                <td>{new Date(h.ts).toLocaleString()}</td>
                <td title={h.label}>{h.foodKey}</td>
                <td>{h.grams}</td>
                <td>{h.kcal}</td>
                <td>{h.protein}</td>
                <td>{h.carbs}</td>
                <td>{h.fat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.section>
  );
}
