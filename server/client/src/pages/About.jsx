import React from "react";

export default function About() {
  return (
    <main className="about-wrap">
      <section className="about-card" role="region" aria-labelledby="about-title">
        <h1 id="about-title" className="about-title">About NutriVision</h1>
        <p className="about-lead">
          NutriVision helps you understand your meals at a glance. Using a Food-101
          image classifier and a per-100g nutrition table, we estimate calories and
          macros and give you practical tips for healthier choices.
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
              Fast, lightweight and privacy-respecting. Upload a food photo, get
              instant insights, and save your results for later review.
            </p>
          </div>

          <div className="about-block">
            <h3>Healthy Habits</h3>
            <p>
              We focus on consistency over perfection: balanced plates, mindful
              portions, water first, and daily movement you enjoy.
            </p>
          </div>

          <div className="about-block">
            <h3>Food</h3>
            <p>
              Mix whole foods—lean proteins, colorful veggies, smart carbs, and
              healthy fats. NutriVision shows you how each meal contributes to your
              goals.
            </p>
          </div>

          <div className="about-block">
            <h3>Sport & Activity</h3>
            <p>
              Track progress with Apple Health or Google Fit. Strength + cardio +
              recovery = long-term performance and better energy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
