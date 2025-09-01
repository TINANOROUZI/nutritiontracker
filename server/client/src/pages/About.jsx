import React from "react";

export default function About() {
  return (
    <main className="about-wrap">
      <section className="about-card" role="region" aria-labelledby="about-title">
        <header>
          <h1 id="about-title" className="about-title">About NutriVision</h1>
          <p className="about-kicker">Full-stack + ML demo for smarter nutrition.</p>
        </header>

        <p className="about-lead">
          NutriVision recognizes meals from photos and estimates calories & macros
          using a Food-101 image model and a per-100g nutrition table. Our goal is
          to make healthy choices simpler and faster.
        </p>

        <ul className="list">
          <li><strong>Frontend:</strong> React + Vite</li>
          <li><strong>Backend:</strong> Node + Express</li>
          <li><strong>ML:</strong> Food-101 model</li>
        </ul>

        <div className="about-grid">
          <div className="about-block">
            <h3>Our Site</h3>
            <p>
              Fast, lightweight, privacy-respecting. Upload a food photo to get instant
              insights and save your results for review.
            </p>
          </div>

          <div className="about-block">
            <h3>Healthy Habits</h3>
            <p>
              We focus on consistency: balanced plates, mindful portions, water first,
              and daily movement you actually enjoy.
            </p>
          </div>

          <div className="about-block">
            <h3>Food</h3>
            <p>
              Mix whole foods—lean proteins, colorful veggies, smart carbs, and healthy fats.
              NutriVision shows how each meal contributes to your goals.
            </p>
          </div>

          <div className="about-block">
            <h3>Sport & Activity</h3>
            <p>
              Connect Apple Health or Google Fit to keep an eye on activity. Strength + cardio +
              recovery = energy, longevity, and progress.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
