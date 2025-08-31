export default function ExerciseCard({ item, onClick }) {
  return (
    <button className="ex-card" onClick={onClick}>
      <div className="ex-thumb" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="ex-body">
        <div className="ex-title">{item.name}</div>
        <div className="ex-meta">
          <span>{item.category}</span>
          <span>•</span>
          <span>{item.equipment}</span>
        </div>
      </div>
    </button>
  );
}
