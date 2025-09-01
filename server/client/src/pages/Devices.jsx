import React from "react";

export default function Devices() {
  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="device-gallery">
        <figure className="device-shot">
          <img
            src="/assets/devices/apple-watch.jpg"
            alt="Apple Watch activity rings on iPhone"
            loading="lazy"
          />
          <figcaption>Apple Health (iPhone & Apple Watch)</figcaption>
        </figure>

        <figure className="device-shot">
          <img
            src="/assets/devices/google-fit.jpg"
            alt="Google Fit activity on Android"
            loading="lazy"
          />
          <figcaption>Google Fit (Android)</figcaption>
        </figure>
      </div>
    </div>
  );
}
