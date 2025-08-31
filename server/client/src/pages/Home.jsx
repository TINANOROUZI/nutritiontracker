import QuickAnalyze from "../components/QuickAnalyze";
import BmiWidget from "../components/BmiWidget";

export default function Home(){
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Eat smarter. Move daily. Feel amazing.</h1>
            <p>
              Upload a meal photo to estimate calories & macros, track your BMI,
              and build healthy habits that actually stick.
            </p>
            <div className="hero-cta">
              <a href="/signup" className="btn-primary">Create free account</a>
              <a href="/login" className="btn">Log in</a>
            </div>

            <div style={{marginTop:14}}>
              <QuickAnalyze />
            </div>
          </div>

          <div>
            <BmiWidget />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature pic-left">
              <div className="f-img" style={{backgroundImage:`url(https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop)`}}/>
              <div className="f-body">
                <div className="f-title">Sync with your devices</div>
                <p>Connect Apple Health, Google Fit and more to see the full picture.</p>
              </div>
            </div>
            <div className="feature pic-mid">
              <div className="f-img" style={{backgroundImage:`url(https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop)`}}/>
              <div className="f-body">
                <div className="f-title">Develop healthy habits</div>
                <p>Keep streaks, set reminders, and celebrate progress—one day at a time.</p>
              </div>
            </div>
            <div className="feature pic-right">
              <div className="f-img" style={{backgroundImage:`url(https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=1200&auto=format&fit=crop)`}}/>
              <div className="f-body">
                <div className="f-title">Dial up your diet</div>
                <p>Macros made simple so you can fuel performance—without obsession.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
