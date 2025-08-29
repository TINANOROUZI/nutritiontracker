// Minimal, compact hero. If you pass variant="none", it hides entirely.
export default function Hero({ title, subtitle, bg, variant = "compact" }) {
  if (variant === "none") return null;

  return (
    <div className="hero-compact" style={{ "--hero-bg": `url("${bg}")` }}>
      <div className="hero-compact-bg" />
      <div className="hero-compact-inner">
        <span className="page-badge">{title}</span>
        {subtitle && <span className="page-subtle">{subtitle}</span>}
      </div>
    </div>
  );
}
