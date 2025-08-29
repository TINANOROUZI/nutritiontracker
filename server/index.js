// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fetch = require("node-fetch");
const fs = require("fs/promises");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const upload = multer();

// ---- ENV
const PORT = process.env.PORT || 5001;
const HF_API_TOKEN = (process.env.HF_API_TOKEN || "").trim();
const MODEL_ID = process.env.MODEL_ID || "nateraw/food";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// ---- CORS + parsers
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [/^http:\/\/localhost:5173$/, /^http:\/\/127\.0\.0\.1:5173$/],
    credentials: true,
  })
);

// ---- Simple JSON file "DB"
const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {}
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
}
ensureData();

async function readUsers() {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}
async function writeUsers(list) {
  await fs.writeFile(USERS_FILE, JSON.stringify(list, null, 2));
}

// ---- Auth helpers
function signToken(user) {
  return jwt.sign(
    { uid: user.id, email: user.email, name: user.name || "" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}
function setAuthCookie(res, token) {
  res.cookie("auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // set true in production behind HTTPS
    maxAge: 7 * 24 * 3600 * 1000,
  });
}
function clearAuthCookie(res) {
  res.clearCookie("auth", { httpOnly: true, sameSite: "lax", secure: false });
}
function requireAuth(req, res, next) {
  const token = req.cookies?.auth;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }
}

// ---- AUTH ROUTES
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name = "" } = req.body || {};
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "Email and password are required" });

  const users = await readUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
    return res.status(409).json({ error: "Email already registered" });

  const passHash = await bcrypt.hash(password, 10);
  const user = {
    id:
      Date.now().toString(36) + Math.random().toString(36).slice(2),
    email: email.toLowerCase(),
    name,
    passHash,
    history: [],
  };
  users.push(user);
  await writeUsers(users);

  const token = signToken(user);
  setAuthCookie(res, token);
  res.json({ id: user.id, email: user.email, name: user.name });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "Email and password are required" });

  const users = await readUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  setAuthCookie(res, token);
  res.json({ id: user.id, email: user.email, name: user.name });
});

app.post("/api/auth/logout", (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  const users = await readUsers();
  const user = users.find((u) => u.id === req.user.uid);
  if (!user) return res.status(401).json({ error: "No such user" });
  res.json({ id: user.id, email: user.email, name: user.name });
});

// ---- Nutrition endpoint (toy table)
const NUTRITION = {
  pizza: { kcal: 266, protein: 11, carbs: 33, fat: 10 },
  banana: { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  hamburger: { kcal: 295, protein: 17, carbs: 24, fat: 14 },
  sushi: { kcal: 145, protein: 10, carbs: 28, fat: 2 },
  salad: { kcal: 33, protein: 2, carbs: 6, fat: 0.4 },
};

app.get("/api/nutrition", (req, res) => {
  const foodKey = (req.query.foodKey || "").toLowerCase();
  const grams = Math.max(1, parseInt(req.query.grams || "100", 10));
  const base = NUTRITION[foodKey] || NUTRITION.pizza;
  const factor = grams / 100.0;
  res.json({
    foodKey,
    grams,
    kcal: Math.round(base.kcal * factor),
    protein: +(base.protein * factor).toFixed(1),
    carbs: +(base.carbs * factor).toFixed(1),
    fat: +(base.fat * factor).toFixed(1),
  });
});

// ---- Per-user history (protected)
app.get("/api/history", requireAuth, async (req, res) => {
  const users = await readUsers();
  const user = users.find((u) => u.id === req.user.uid);
  if (!user) return res.status(401).json({ error: "No such user" });
  res.json(user.history || []);
});

app.post("/api/history", requireAuth, async (req, res) => {
  const entry = req.body || {};
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === req.user.uid);
  if (idx === -1) return res.status(401).json({ error: "No such user" });

  const e = { id: Date.now().toString(36), ...entry };
  users[idx].history = [e, ...(users[idx].history || [])];
  await writeUsers(users);
  res.json(e);
});

// ---- ML ANALYZE (logs + retries + clearer errors + optional mock)
app.post("/api/analyze", upload.single("image"), async (req, res) => {
  try {
    // Optional local mock to keep UI working while debugging HF
    if (process.env.MOCK_ANALYZE === "1") {
      const predictions = [
        { label: "pizza", score: 0.92 },
        { label: "hamburger", score: 0.05 },
        { label: "salad", score: 0.03 },
      ];
      const suggestions = predictions.slice(0, 5).map((p) => ({
        key: p.label.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
        rawLabel: p.label,
        score: p.score,
        nutrition: true,
      }));
      return res.json({ predictions, suggestions });
    }

    const token = HF_API_TOKEN;
    if (!token || !token.startsWith("hf_")) {
      console.error("[analyze] Missing/invalid HF_API_TOKEN.");
      return res
        .status(500)
        .json({ error: "HF_API_TOKEN not set or invalid on server" });
    }

    const bytes = req.file?.buffer;
    if (!bytes) return res.status(400).json({ error: "No image uploaded" });

    const url = `https://api-inference.huggingface.co/models/${MODEL_ID}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
      Accept: "application/json",
    };

    async function callHF(attempt = 1) {
      const r = await fetch(url, { method: "POST", headers, body: bytes });

      // Cold-start: model loading (503)
      if (r.status === 503 && attempt < 4) {
        const t = await r.text().catch(() => "");
        console.warn(
          `[analyze] HF 503/Loading (attempt ${attempt}/3):`,
          t
        );
        await new Promise((s) => setTimeout(s, 1500 * attempt));
        return callHF(attempt + 1);
      }

      if (!r.ok) {
  const t = await r.text().catch(() => "");
  console.error(`[analyze] HF error ${r.status}:`, t);
  return res
    .status(r.status)
    .json({ error: t || `Hugging Face error ${r.status}` });
}

// 👇 NEW DEBUGGING BLOCK
const rawText = await r.text();
console.log("[HF raw response]", rawText);

let parsed;
try {
  parsed = JSON.parse(rawText);
} catch (e) {
  console.error("[analyze] JSON parse error:", e);
  return res.status(500).json({ error: "Invalid JSON from HF", raw: rawText });
}
return parsed;

    }

    const out = await callHF();
    if (!out) return; // error already sent

    const predictions = (Array.isArray(out) ? out : []).map((o) => ({
      label: o.label,
      score: o.score,
    }));

    const suggestions = predictions.slice(0, 5).map((p) => ({
      key: p.label.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
      rawLabel: p.label,
      score: p.score,
      nutrition: true,
    }));

    res.json({ predictions, suggestions });
  } catch (e) {
    console.error("[analyze] Unexpected error:", e);
    res.status(500).json({ error: e.message || "Analyze failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Nutrition server running on http://localhost:${PORT}`);
});
