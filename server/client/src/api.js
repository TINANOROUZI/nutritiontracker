// src/api.js

// Base URL to your server (uses Netlify env if set, otherwise your Render URL)
const API = (
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "https://nutrition-tracker-t8be.onrender.com"
).replace(/\/$/, "");

// --- small helper to parse error messages from the server
async function parseError(resp) {
  try {
    const data = await resp.json();
    return data?.error || data?.message || resp.statusText || "Request failed";
  } catch {
    try {
      return await resp.text();
    } catch {
      return "Request failed";
    }
  }
}

// --- generic request helper (JSON by default, with cookies)
async function request(path, opts = {}) {
  const { json, ...rest } = opts;
  const init = {
    credentials: "include", // send/receive cookies
    headers: {},
    ...rest,
  };

  if (json !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(json);
  }

  const res = await fetch(`${API}${path}`, init);
  if (!res.ok) {
    throw new Error(await parseError(res));
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

// =======================================================
// ML
// =======================================================
export async function analyzeImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`${API}/api/analyze`, {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function computeNutrition(foodKey, grams) {
  const res = await fetch(
    `${API}/api/nutrition?foodKey=${encodeURIComponent(foodKey)}&grams=${encodeURIComponent(grams)}`,
    { credentials: "include" }
  );
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

// =======================================================
// Auth
// =======================================================
export async function register(a, b, c) {
  const payload = typeof a === "object" ? a : { email: a, password: b, name: c };
  return request("/api/auth/register", { method: "POST", json: payload });
}

export async function login(a, b) {
  const payload = typeof a === "object" ? a : { email: a, password: b };
  return request("/api/auth/login", { method: "POST", json: payload });
}

export async function logout() {
  return request("/api/auth/logout", { method: "POST" });
}

export async function me() {
  try {
    return await request("/api/auth/me");
  } catch {
    return null;
  }
}

// =======================================================
// History (auth required)
// =======================================================
export async function saveHistory(entry) {
  return request("/api/history", { method: "POST", json: entry });
}

export async function getHistory() {
  return request("/api/history");
}
