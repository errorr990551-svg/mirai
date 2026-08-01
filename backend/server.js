import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { httpServerHandler } from "cloudflare:node";
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

export default httpServerHandler(app);
