import React from "react";

export default function Devices() {
  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="device-gallery">
        <figure className="device-shot">
          <a
            href="https://www.apple.com/apple-fitness-plus/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Apple Fitness+"
          >
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop"
              alt="Apple Watch with fitness rings"
              loading="lazy"
            />
            <figcaption>Apple Health (iPhone &amp; Apple Watch)</figcaption>
          </a>
        </figure>

        <figure className="device-shot">
          <a
            href="https://www.google.com/fit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Google Fit"
          >
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop"
              alt="Android phone showing fitness stats"
              loading="lazy"
            />
            <figcaption>Google Fit (Android)</figcaption>
          </a>
        </figure>
      </div>
    </div>
  );
}
