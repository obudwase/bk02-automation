require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json({ limit: "2mb" }));

const PORT = process.env.PORT || 3001;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("FATAL: OPENROUTER_API_KEY is not set in .env");
  process.exit(1);
}

app.post("/api/generate", async (req, res) => {
  const { system, maxTokens = 1500 } = req.body;
  if (!system) return res.status(400).json({ error: "system prompt required" });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3001",
        "X-Title": "The Opposition Engine",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4",
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: system },
          { role: "user", content: "Generate the output now. Return only valid JSON with no markdown fences." },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    res.json({ text });
  } catch (err) {
    console.error("OpenRouter proxy error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Opposition Engine proxy listening on 127.0.0.1:${PORT}`);
});
