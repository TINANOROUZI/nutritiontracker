// server/index.js
require("dotenv").config();

process.on("unhandledRejection", (e) => {
  console.error("[UNHANDLED REJECTION]", e);
  process.exit(1);
});
process.on("uncaughtException", (e) => {
  console.error("[UNCAUGHT EXCEPTION]", e);
  process.exit(1);
});

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const upload = multer();

const PORT = process.env.PORT || 5001;
const IS_PROD = process.env.NODE_ENV === "production";
const HF_API_TOKEN = (process.env.HF_API_TOKEN || "").trim();
const MODEL_ID = process.env.MODEL_ID || "nateraw/food";

/* ===================== CORS (Netlify + previews + localhost) ===================== */
const NETLIFY_BASE = process.env.NETLIFY_BASE || "nutritiontracker-tina.netlify.app";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  `https://${NETLIFY_BASE}`,
].join(","))
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// trust proxy so secure cookies work behind Render
app.set("trust proxy", 1);

function isAllowedOrigin(origin) {
  if (!origin) return true; // allow curl/postman
  try {
    const u = new URL(origin);
    if (ALLOWED_ORIGINS.includes(origin)) return true;
    const host = u.host.toLowerCase();
    if (host === NETLIFY_BASE) return true;
    if (host.endsWith(`--${NETLIFY_BASE}`)) return true; // Netlify previews
    return false;
  } catch {
    return false;
  }
}

const corsOptions = {
  origin(origin, cb) {
    const ok = isAllowedOrigin(origin);
    cb(ok ? null : new Error("CORS: origin not allowed"), ok);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
/* ================================================================================ */

// Writable dir for users.json (Render-safe)
const DATA_DIR =
  process.env.DATA_DIR ||
  (process.platform === "win32"
    ? path.join(process.cwd(), "runtime-data")
    : "/tmp/nutri-data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

app.use(cookieParser());
app.use(express.json());

// ---------- data helpers ----------
async function ensureData() {
  await fs.mkdir(DATA_DIR, { recursive: true }).catch(() => {});
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
  } catch (e) {
    console.error("[readUsers] failed:", e);
    return [];
  }
}
async function writeUsers(list) {
  await fs.writeFile(USERS_FILE, JSON.stringify(list, null, 2));
}

// ---------- auth helpers ----------
function signToken(user) {
  return jwt.sign(
    { uid: user.id, email: user.email, name: user.name || "" },
    process.env.JWT_SECRET || "dev-secret-change-me",
    { expiresIn: "7d" }
  );
}
function setAuthCookie(res, token) {
  res.cookie("auth", token, {
    httpOnly: true,
    sameSite: IS_PROD ? "none" : "lax",
    secure: IS_PROD,
    maxAge: 7 * 24 * 3600 * 1000,
  });
}
function clearAuthCookie(res) {
  res.clearCookie("auth", {
    httpOnly: true,
    sameSite: IS_PROD ? "none" : "lax",
    secure: IS_PROD,
  });
}
function requireAuth(req, res, next) {
  const token = req.cookies?.auth;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret-change-me"
    );
    next();
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }
}

// ---------- health ----------
app.get("/ping", (_req, res) => res.send("ok"));

// ---------- auth routes ----------
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
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
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
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  setAuthCookie(res, token);
  res.json({ id: user.id, email: user.email, name: user.name });
});

app.post("/api/auth/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  const users = await readUsers();
  const user = users.find((u) => u.id === req.user.uid);
  if (!user) return res.status(401).json({ error: "No such user" });
  res.json({ id: user.id, email: user.email, name: user.name });
});

// ---------- nutrition (simple table) ----------
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
  const f = grams / 100.0;
  res.json({
    foodKey,
    grams,
    kcal: Math.round(base.kcal * f),
    protein: +(base.protein * f).toFixed(1),
    carbs: +(base.carbs * f).toFixed(1),
    fat: +(base.fat * f).toFixed(1),
  });
});

// ---------- history (auth required; auto-create user if missing) ----------
app.get("/api/history", requireAuth, async (req, res) => {
  const users = await readUsers();
  const user = users.find((u) => u.id === req.user.uid);
  if (!user) return res.json([]); // empty after redeploy
  res.json(user.history || []);
});

app.post("/api/history", requireAuth, async (req, res) => {
  const entry = req.body || {};
  const users = await readUsers();

  let idx = users.findIndex((u) => u.id === req.user.uid);
  if (idx === -1) {
    // If the file was reset after a deploy, recreate a lightweight record
    users.push({
      id: req.user.uid,
      email: (req.user.email || "").toLowerCase(),
      name: req.user.name || "",
      passHash: "", // unknown here; full record will be restored on next login
      history: [],
    });
    idx = users.length - 1;
  }

  const e = { id: Date.now().toString(36), ...entry };
  users[idx].history = [e, ...(users[idx].history || [])];
  await writeUsers(users);
  res.json(e);
});

// ---------- analyze (Hugging Face) ----------
app.post("/api/analyze", upload.single("image"), async (req, res) => {
  try {
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

    if (!HF_API_TOKEN || !HF_API_TOKEN.startsWith("hf_")) {
      return res
        .status(500)
        .json({ error: "HF_API_TOKEN not set or invalid on server" });
    }
    const bytes = req.file?.buffer;
    if (!bytes) return res.status(400).json({ error: "No image uploaded" });

    const url = `https://api-inference.huggingface.co/models/${MODEL_ID}`;
    const headers = {
      Authorization: `Bearer ${HF_API_TOKEN}`,
      "Content-Type": "application/octet-stream",
      Accept: "application/json",
    };

    async function callHF(attempt = 1) {
      const r = await fetch(url, { method: "POST", headers, body: bytes });
      if (r.status === 503 && attempt < 4) {
        await new Promise((s) => setTimeout(s, 1500 * attempt));
        return callHF(attempt + 1);
      }
      const text = await r.text().catch(() => "");
      if (!r.ok) return { ok: false, status: r.status, body: text };
      try {
        return { ok: true, data: JSON.parse(text) };
      } catch {
        return { ok: false, status: 500, body: "Invalid JSON from HF", raw: text };
      }
    }

    const result = await callHF();
    if (!result.ok) {
      return res
        .status(result.status)
        .json({ error: result.body || `Hugging Face error ${result.status}` });
    }

    const out = result.data;
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
