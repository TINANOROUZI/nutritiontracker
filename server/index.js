require("dotenv").config();
console.error("[analyze] Missing/invalid HF_API_TOKEN.");
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
const t = await r.text().catch(() => "");
console.warn(`[analyze] HF 503/Loading (attempt ${attempt}/3):`, t);
await new Promise((s) => setTimeout(s, 1500 * attempt));
return callHF(attempt + 1);
}


const rawText = await r.text().catch(() => "");
if (!r.ok) {
return { ok: false, status: r.status, body: rawText };
}


let parsed;
try {
parsed = JSON.parse(rawText);
} catch (e) {
return { ok: false, status: 500, body: "Invalid JSON from HF", raw: rawText };
}
return { ok: true, data: parsed };
}


const result = await callHF();
if (!result.ok) {
console.error(`[analyze] HF error ${result.status}:`, result.body);
return res
.status(result.status)
.json({ error: result.body || `Hugging Face error ${result.status}`, raw: result.raw });
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
