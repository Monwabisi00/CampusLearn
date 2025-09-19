import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import studentRoutes from "./routes/studentRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// static uploads (create uploads/ folder later)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/students", studentRoutes);
app.use("/tutors", tutorRoutes);
app.use("/modules", moduleRoutes);
app.use("/topics", topicRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/resources", resourceRoutes);
app.use("/queries", queryRoutes);
app.use("/responses", responseRoutes);
app.use("/messages", messageRoutes);
app.use("/notifications", notificationRoutes);
app.use("/auth", authRoutes);

// health
app.get("/_health", (req, res) => res.json({ ok: true }));

export default app;
