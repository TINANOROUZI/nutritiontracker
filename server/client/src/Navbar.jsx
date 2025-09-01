:root{
  --bg:#0b0f17;
  --ink:#eaf1ff;
  --muted:#9fb0cc;
  --card:#111827;
  --stroke:#223051;
  --accent:#ff8a1e;
  --accent2:#f97316;
  --blue:#60a5fa;
  --ring: 0 8px 30px rgba(0,0,0,.35);
}

*{ box-sizing:border-box }
html,body,#root{ height:100% }

body{
  margin:0;
  color:var(--ink);
  font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;
  background:
    linear-gradient(180deg, rgba(10,15,25,.85), rgba(10,15,25,.92)),
    url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1920&auto=format&fit=crop");
  background-size:cover;
  background-position:center;
  background-attachment:fixed;
}

a{ color:inherit; text-decoration:none }
.container{ width:min(1200px,92%); margin-inline:auto }

/* ===================== NAV + DRAWER ===================== */
header.nav{
  position: static;
  top: auto;
  z-index: 50;
  background: rgba(10,14,25,.6);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #16223e;
}
header.nav .nav-inner{
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand{ display:flex; align-items:center; gap:.6rem; font-weight:900; font-size:1.15rem; }

header.nav .links{ display:none !important; gap:12px; margin-left:12px; }
header.nav .links a{ padding:.45rem .7rem; border-radius:10px; color:#cfe1ff; white-space:nowrap; }
header.nav .links a:hover{ background:#15213d }

@media (min-width:1025px){
  header.nav .links{ display:flex !important; }
  .hamburger-min{ display:none !important; }
}

@media (max-width:1024px){
  header.nav .links{ display:none !important; }
}

/* ===================== HAMBURGER (minimal style) ===================== */
.hamburger-min {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:40px; height:40px;
  margin-left:auto;
  background:transparent;
  border:0;
  cursor:pointer;
  position:relative;
}

.hamburger-min .bar,
.hamburger-min .bar::before,
.hamburger-min .bar::after{
  content:"";
  position:absolute;
  left:50%;
  width:22px; height:3px;
  background:#9aa3ad;
  border-radius:3px;
  transform:translateX(-50%);
  transition:transform .22s ease, opacity .22s ease, background .22s ease;
}

/* middle bar */
.hamburger-min .bar{ top:50%; }

/* top & bottom bars */
.hamburger-min .bar::before{ top:-8px; }
.hamburger-min .bar::after{  top: 8px; }

/* hover brighten */
.hamburger-min:hover .bar,
.hamburger-min:hover .bar::before,
.hamburger-min:hover .bar::after{
  background:#b7c0c8;
}

/* OPEN STATE → X */
.hamburger-min.is-open .bar{ opacity:0; }
.hamburger-min.is-open .bar::before{
  transform:translate(-50%,8px) rotate(45deg);
}
.hamburger-min.is-open .bar::after{
  transform:translate(-50%,-8px) rotate(-45deg);
}

/* ===================== Drawer ===================== */
.drawer-backdrop{ position:fixed; inset:0; background:rgba(8,11,19,.55); z-index:60; }
.drawer{
  position:fixed; inset:0 0 0 auto; width:min(320px,85vw);
  transform:translateX(100%); transition:transform .25s ease; z-index:61;
}
.drawer.show{ transform:translateX(0); }
.drawer-inner{
  height:100%; background:#0e1527; border-left:1px solid #1f2646;
  padding:14px; display:flex; flex-direction:column; gap:10px;
}
.drawer-header{ display:flex; align-items:center; justify-content:space-between; }
.drawer-close{
  border:0; background:#141c33; color:#dbe2ff; width:36px; height:36px; border-radius:10px;
}
.drawer-links{ display:flex; flex-direction:column; gap:10px; margin-top:6px; }
.drawer-links a, .drawer-links .btn{
  padding:.65rem .8rem; border-radius:12px; background:#101732; border:1px solid #1c2750; color:#cfe1ff;
}
.drawer-links a:hover{ background:#15213d }

/* ===================== TICKER ===================== */
.ticker{
  background: transparent; color: var(--ink); font-weight: 600; font-size: .95rem;
  padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.14);
}
.ticker span{ margin-right:32px; }
.ticker + main.wrap{ margin-top:16px; }

/* ===================== QUICK ANALYZE ===================== */
.qa-card{
  background:linear-gradient(180deg,#131a2b,#0f1524);
  border:1px solid var(--stroke); border-radius:18px; box-shadow:var(--ring); padding:1rem;
}
.card-title{ margin:0 0 .6rem; font-size:1.15rem; font-weight:900 }
.qa-top{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.file{ background:#0b1222;border:1px solid var(--stroke);border-radius:12px; padding:.6rem .7rem;color:#bcd1ff;cursor:pointer }
.file input{display:none}
.qa-preview{margin:.6rem 0;border-radius:12px;overflow:hidden;border:1px solid #1c2a4a}
.qa-preview img{width:100%;display:block;max-height:380px;object-fit:cover}
.chips{display:flex;flex-wrap:wrap;gap:.4rem}
.chip{ background:#16213b;border:1px solid #2a3c6b;color:#bcd1ff; padding:.35rem .6rem;border-radius:999px;cursor:pointer }
.chip--on{background:#2b3c6a;color:#fff}
.slider-row{display:flex;align-items:center;gap:.7rem;margin:.5rem 0}
.slider-row input[type="range"]{flex:1}
.metrics{ display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:.6rem 0 }
.metric{ background:#0b1222;border:1px solid var(--stroke);padding:.7rem; border-radius:12px;text-align:center }
.metric .k{font-weight:900;font-size:1.05rem}
.metric .v{color:var(--muted)}

/* ===================== TOP GRID (Analyzer + BMI) ===================== */
.top-grid{ display:grid; gap:14px; grid-template-columns:1.1fr .9fr; align-items:start; }
@media (max-width:980px){ .top-grid{ grid-template-columns:1fr } }

/* ===================== BMI ===================== */
.bmi-card{
  background: linear-gradient(180deg,#131a2b,#0f1524);
  border: 1px solid var(--stroke);
  border-radius: 18px;
  padding: 1rem;
  box-shadow: var(--ring);
}
.bmi-card .card-title{ margin:0 0 .6rem; font-size:1.15rem; font-weight:900; }
.bmi-io{ display:grid; grid-template-columns:1fr 1fr; gap:.7rem; max-width:520px; margin:0 auto; }
@media (max-width:520px){ .bmi-io{ grid-template-columns:1fr; } }
.bmi-io input{
  background:#0b1222; border:1px solid var(--stroke); color:var(--ink);
  border-radius:12px; padding:.7rem .8rem;
}
.bmi-value{
  --accent:#60a5fa;
  position: relative;
  width:130px; height:120px;
  margin:.7rem auto .35rem;
  border-radius:22px;
  border:1px solid rgba(96,165,250,.18);
  box-shadow: inset 0 10px 18px rgba(0,0,0,.35), 0 10px 28px rgba(0,0,0,.35);
  background: radial-gradient(120px 80px at 50% 22%, rgba(96,165,250,.9), rgba(96,165,250,0) 70%),
              linear-gradient(180deg,#18243b 0%, #0f1629 60%, #0b1222 100%);
  display:grid; place-items:center;
  font-size:2rem; font-weight:800; letter-spacing:.5px; color:#eef3ff;
}
.bmi-value::before{
  content:""; position:absolute; left:12%; right:12%; top:10%;
  height:28px; border-radius:18px;
  background:linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,0));
  filter:blur(1px); pointer-events:none;
}
.bmi-value::after{
  content:""; position:absolute; left:50%; transform:translateX(-50%); bottom:-10px;
  width:60%; height:12px;
  background:radial-gradient(60% 100% at 50% 0%, rgba(0,0,0,.45), transparent 70%);
  pointer-events:none;
}
.bmi-label{ font-weight:800; margin:.05rem 0 .15rem; text-align:center; font-size:.95rem; letter-spacing:.2px; }
.bmi-tip{ color:var(--muted); font-size:.9rem; text-align:center; line-height:1.35; margin-top:.15rem; }
.bmi-msg{ color:#a3e635; font-weight:700; margin-top:.4rem; text-align:center; font-size:.95rem; }
.bmi-btn{
  display:block; width:100%; margin-top:.5rem;
  border:1px solid transparent; background:#16a34a; color:#fff;
  font-weight:600; border-radius:10px; padding:.55rem .8rem;
  cursor:pointer; transition:.18s ease;
}
.bmi-btn:hover{ background:#15803d }

/* ===================== HERO/FEATURES ===================== */
.features{margin:1.2rem 0 1.8rem}
.feature-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px }
@media (max-width:900px){ .feature-grid{ grid-template-columns:1fr } }
.feature{ border-radius:18px; overflow:hidden; box-shadow:var(--ring); border:1px solid #1f2d52; display:grid; grid-template-rows:auto 1fr; }
.feature.pic-left{background:#1f2a48}
.feature.pic-mid{background:#1f3e2c}
.feature.pic-right{background:#241e33}
.feature .f-img{ aspect-ratio:16/9; background-size:cover; background-position:center; filter:saturate(1.05); }
.feature .f-body{ padding:1rem }
.feature .f-title{ font-weight:900; font-size:1.1rem }

/* Buttons */
.btn{ display:inline-flex; align-items:center; gap:.5rem; background:#111a33; border:1px solid #1f2d52; color:#d9e7ff; padding:.6rem .85rem; border-radius:12px; cursor:pointer; }
.btn:hover{ background:#16254a }
.btn-primary{ background:linear-gradient(90deg,var(--accent),#ffd08a); color:#23180a; border:0; padding:.7rem 1rem; border-radius:12px; font-weight:800; box-shadow:var(--ring) }
.btn-ghost{ background:transparent; border:1px solid #26345d }
.btn-wide{ width:100%; justify-content:center; font-weight:800; }

/* ===================== DEVICES ===================== */
.device-grid{ display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:14px; }
@media (max-width:900px){ .device-grid{ grid-template-columns:1fr; } }
.device-card{ border-radius:18px; overflow:hidden; border:1px solid #1f2d52; background:#0f1524; box-shadow:0 8px 30px rgba(0,0,0,.35); display:grid; grid-template-rows:auto 1fr; }
.device-hero{ height: 220px; background:#10182e; }
.device-hero img{ width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; user-select:none; }
.device-card .f-body{ padding:1rem; }
.device-card .f-title{ font-weight:900; font-size:1.15rem; margin:0 0 .4rem; }
.device-gallery{ display:grid; grid-template-columns: 1fr 1fr; gap:14px; }
@media (max-width:900px){ .device-gallery{ grid-template-columns: 1fr; } }
.device-shot{ background: var(--card); border: 1px solid var(--stroke); border-radius: 18px; overflow: hidden; box-shadow: var(--ring); }
.device-shot a{ display:block; color:inherit; text-decoration:none; }
.device-shot a:focus-visible{ outline:2px solid var(--accent); outline-offset:2px; }
.device-shot img{ width: 100%; height: 360px; object-fit: cover; display: block; }
.device-shot figcaption{ padding: 12px 14px; font-weight: 800; }
.device-shot a:hover figcaption{ text-decoration: underline; }

/* ===================== EXERCISES ===================== */
.ex-page{padding:1rem}
.ex-hero{text-align:center;margin-bottom:.6rem}
.ex-hero h1{font-size:clamp(1.6rem,2.2vw,2.2rem)}
.ex-hero p{color:var(--muted)}
.ex-search{display:grid;gap:.7rem;justify-items:center;margin-top:.4rem}
.ex-search input{ width:min(760px,92%);background:#0b1222;color:var(--ink); border:1px solid var(--stroke);border-radius:14px;padding:.85rem 1rem;font-size:1rem }
.ex-cats{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center}
.chip--cat{background:#1c2544;border:1px solid #26386a;color:#cfe1ff}
.chip--cat.chip--on{background:#2c3f72}
.ex-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:1rem}
.ex-card{background:var(--card);border:1px solid var(--stroke);border-radius:16px;overflow:hidden;text-align:left;cursor:pointer;box-shadow:var(--ring)}
.ex-thumb{ background-size:cover; background-position:center; height:160px; background-color:#0b1222; }
.ex-body{ padding:.75rem .9rem; color: var(--ink); }
.ex-title{ font-weight:900; color: var(--ink); }
.ex-meta{color:var(--muted);font-size:.92rem;display:flex;gap:.5rem;align-items:center}
.ex-modal{position:fixed;inset:0;background:rgba(8,11,19,.55);display:grid;place-items:center;z-index:60}
.ex-sheet{width:min(820px,94%);background:#0e1527;border:1px solid var(--stroke);border-radius:18px;padding:1rem 1.1rem;box-shadow:var(--ring)}
.ex-sheet-img{height:240px;border-radius:12px;background-size:cover;background-position:center;margin-bottom:.7rem}
.ex-sheet-sub{color:var(--muted);margin-bottom:.6rem}
.ex-steps{margin-left:1.2rem;line-height:1.7}

/* ===================== FOOTER ===================== */
.footer{ display:flex; justify-content:center; align-items:center; color:#a4b7d8; border-top:1px solid #16223e; padding:16px 0; margin-top:24px; }

/* ===================== AUTH ===================== */
.auth-wrap{ min-height: calc(100vh - 140px); display:grid; place-items:center; padding:24px 10px; }
.auth-card{ width:min(460px, 92%); background:linear-gradient(180deg,#131a2b,#0f1524); border:1px solid var(--stroke); border-radius:18px; box-shadow:var(--ring); padding:24px; }
.auth-title{ margin:0; font-size:clamp(1.4rem,2.2vw,1.8rem); font-weight:900; }
.auth-sub{ margin:6px 0 14px; color:var(--muted); }
.form{ display:grid; gap:12px; }
.form-row{ display:grid; gap:6px; }
.form-row label{ font-weight:800; color:var(--ink); }
.input{ width:100%; background:#0b1222; border:1px solid var(--stroke); color:var(--ink); border-radius:12px; padding:.85rem 1rem; outline:none; transition:border-color .15s ease, box-shadow .15s ease; }
.input::placeholder{ color:#9fb0cc; opacity:.9; }
.input:focus{ 
  border-color:#335abf; 
  box-shadow:0 0 0 3px rgba(96,165,250,.2); 
}
.auth-alt{ 
  margin-top:12px; 
  text-align:center; 
  color:#var(--muted); 
}
.link{ 
  color:#cfe1ff; 
  text-decoration:underline; 
}
.link:hover{ 
  text-decoration:none; 
}

/* ===================== ABOUT ===================== */
.about-wrap{ 
  min-height: calc(100vh - 140px); 
  display:grid; 
  place-items:center; 
  padding:24px 10px; 
}
.about-card{ 
  width:min(960px, 94%); 
  background:linear-gradient(180deg,#131a2b,#0f1524); 
  border:1px solid var(--stroke); 
  border-radius:18px; 
  box-shadow:var(--ring); 
  padding: clamp(18px, 2.5vw, 28px); 
}
.about-title{ 
  margin:0; 
  font-size: clamp(1.6rem, 2.6vw, 2rem); 
  font-weight:900; 
}
.about-kicker{ color: var(--muted); margin:.25rem 0 0.75rem; }
.about-lead{ margin:.25rem 0 1rem; color: var(--ink); line-height:1.7; }
.list{ margin:.2rem 0 1rem; padding-left:1.2rem; }
.list li{ margin:.25rem 0; }

.about-grid{ 
  display:grid; 
  grid-template-columns: 1fr 1fr; 
  gap:14px; 
  margin-top:.5rem; 
}
@media (max-width:800px){ .about-grid{ grid-template-columns:1fr; } }
.about-block{ 
  background:#0b1222; 
  border:1px solid var(--stroke); 
  border-radius:14px; 
  padding:14px; 
}
.about-block h3{ margin:.1rem 0 .35rem; font-size:1.05rem; font-weight:900; }
.about-block p{ margin:0; color:var(--muted); line-height:1.6; }

