import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const API_KEY = env.OPENROUTER_API_KEY;
  const MODEL   = env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4-5";

  const apiPlugin = {
    name: "openrouter-api",
    configureServer(server) {
      server.middlewares.use("/oe-automation/api/chat", (req, res) => {
        if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }

        const chunks = [];
        req.on("data", c => chunks.push(c));
        req.on("end", async () => {
          if (!API_KEY) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "OPENROUTER_API_KEY not set in .env" }));
            return;
          }
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString());
            const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": "http://localhost",
                "X-Title": "Opposition Engine",
              },
              body: JSON.stringify({
                model: MODEL,
                max_tokens: body.max_tokens,
                messages: body.messages,
              }),
            });
            const data = await upstream.json();
            res.statusCode = upstream.status;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };

  return {
    base: "/oe-automation/",
    plugins: [react(), apiPlugin],
  };
});
