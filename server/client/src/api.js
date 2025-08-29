// src/api.js

// Base URL to your server (e.g., http://localhost:5001)
// Falls back to localhost if Vite env is missing.
// Also trims any trailing slash to avoid `//api/...`
const API =
  (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, "") : "http://localhost:5001");

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
  // try json, fall back to text
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

// =======================================================
// ML
// =======================================================
export async function analyzeImage(file) {
  const fd = new FormData();
  fd.append("image", file); // let the browser set the multipart boundary
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

// Accepts either register({email, password, name}) OR register(email, password, name)
export async function register(a, b, c) {
  const payload = typeof a === "object" ? a : { email: a, password: b, name: c };
  return request("/api/auth/register", { method: "POST", json: payload });
}

// Accepts either login({email, password}) OR login(email, password)
export async function login(a, b) {
  const payload = typeof a === "object" ? a : { email: a, password: b };
  return request("/api/auth/login", { method: "POST", json: payload });
}

export async function logout() {
  return request("/api/auth/logout", { method: "POST" });
}

// Returns user object or null (if not logged in)
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
