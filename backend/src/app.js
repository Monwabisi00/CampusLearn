import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// static uploads (create uploads/ folder later)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/students", studentRoutes);

// health
app.get("/_health", (req, res) => res.json({ ok: true }));

export default app;