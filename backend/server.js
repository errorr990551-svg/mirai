import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "node:http";
import contactRoutes from "./routes/contactRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

// Server initialization for Node.js and Cloudflare Workers
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Express middleware to ensure env vars are attached to process.env and req.env on every HTTP request
app.use((req, res, next) => {
  const currentEnv = globalThis.env || {};
  req.env = currentEnv;
  if (currentEnv && typeof currentEnv === "object") {
    for (const key of Object.keys(currentEnv)) {
      try { process.env[key] = currentEnv[key]; } catch (e) {}
      try { globalThis[key] = currentEnv[key]; } catch (e) {}
    }
  }
  next();
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api", contactRoutes);
app.use("/api", complaintRoutes);
app.use("/api", applicationRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

let cloudflareHandler = null;
try {
  const cloudflareNode = await import("cloudflare:node");
  if (cloudflareNode?.httpServerHandler) {
    cloudflareHandler = cloudflareNode.httpServerHandler(server);
  }
} catch (err) {
  // Standard Node.js environment - cloudflare:node is not available
}

if (!cloudflareHandler) {
  app.listen(PORT, () => {
    console.log(`Backend server running locally on http://localhost:${PORT}`);
  });
}

export default cloudflareHandler
  ? {
      async fetch(request, env, ctx) {
        if (env && typeof env === "object") {
          globalThis.env = env;
          for (const key of Object.keys(env)) {
            try { process.env[key] = env[key]; } catch (e) {}
            try { globalThis[key] = env[key]; } catch (e) {}
          }
        }
        if (typeof cloudflareHandler === "function") {
          return cloudflareHandler(request, env, ctx);
        }
        if (typeof cloudflareHandler?.fetch === "function") {
          return cloudflareHandler.fetch(request, env, ctx);
        }
        return cloudflareHandler(request, env, ctx);
      },
    }
  : app;

