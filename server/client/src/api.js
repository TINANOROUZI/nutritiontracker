// src/api.js

// --- Base URL to your server (Render) ---
// Hardcoded to your service; trailing slash trimmed.
const API = "https://nutrition-tracker-t8be.onrender.com".replace(/\/$/, "");

// --- helpers ---------------------------------------------------------------
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

async function request(path, opts = {}) {
  const { json, ...rest } = opts;
  const init = {
    method: "GET",
    credentials: "include",        // send/receive auth cookie
    headers: { Accept: "application/json" },
    ...rest,
  };

  if (json !== undefined) {
    init.method = init.method || "POST";
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(json);
  }

  const res = await fetch(`${API}${path}`, init);
  if (!res.ok) throw new Error(await parseError(res));

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

// --- ML --------------------------------------------------------------------
export async function analyzeImage(file) {
  const fd = new FormData();
  fd.append("image", file); // browser sets the multipart boundary
  const res = await fetch(`${API}/api/analyze`, {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function computeNutrition(foodKey, grams) {
  const url = `${API}/api/nutrition?foodKey=${encodeURIComponent(
    foodKey
  )}&grams=${encodeURIComponent(grams)}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

// --- Auth ------------------------------------------------------------------
// register({email, password, name}) OR register(email, password, name)
export async function register(a, b, c) {
  const payload =
    typeof a === "object" ? a : { email: a, password: b, name: c };
  return request("/api/auth/register", { method: "POST", json: payload });
}

// login({email, password}) OR login(email, password)
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

// --- History (requires login) ---------------------------------------------
export async function saveHistory(entry) {
  return request("/api/history", { method: "POST", json: entry });
}

export async function getHistory() {
  return request("/api/history");
}

// (optional) quick health check to debug CORS/base URL issues
export async function pingServer() {
  try {
    const res = await fetch(`${API}/api/nutrition?foodKey=pizza&grams=100`, {
      credentials: "include",
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

export const API_BASE = API;
