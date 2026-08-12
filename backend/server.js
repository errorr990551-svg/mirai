import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "node:http";
import contactRoutes from "./routes/contactRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

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
        if (env) {
          Object.assign(process.env, env);
          globalThis.env = env;
          if (env.RESEND_API_KEY) {
            process.env.RESEND_API_KEY = env.RESEND_API_KEY;
            globalThis.RESEND_API_KEY = env.RESEND_API_KEY;
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

