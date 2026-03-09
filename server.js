import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "5mb" }));

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4-5";
const PORT = process.env.PORT || 3001;

if (!API_KEY) {
  console.error("ERROR: OPENROUTER_API_KEY is not set in .env");
  process.exit(1);
}

app.post("/oe-automation/api/chat", async (req, res) => {
  const { messages, max_tokens } = req.body;
  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": req.headers.origin || "http://localhost",
        "X-Title": "Opposition Engine",
      },
      body: JSON.stringify({ model: MODEL, max_tokens, messages }),
    });
    if (!upstream.ok) {
      const err = await upstream.text();
      return res.status(upstream.status).json({ error: err });
    }
    const data = await upstream.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve built frontend in production
app.use("/oe-automation", express.static(join(__dirname, "dist")));
app.get("/oe-automation/*", (_req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Opposition Engine running on port ${PORT}`));
