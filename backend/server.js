import express from "express";
import cors from "cors";
import pool from "./database.js";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: "http://localhost:3000", // frontend origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// example route: get users

/* app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}); */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
