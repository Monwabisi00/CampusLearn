import express from "express";
import cors from "cors";
import pool from "./database.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// example route: create a student
app.post("/students", async (req, res) => {
  try {
    const { name, email, password, academic_details } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash password before storing
    const passwordHash = await bcrypt.hash(password, 10);

    const insertSql = `
      INSERT INTO students (name, email, password_hash, academic_details)
      VALUES ($1, $2, $3, $4)
      RETURNING student_id, name, email, academic_details, created_at
    `;
    const params = [name, email, passwordHash, academic_details ?? null];

    const result = await pool.query(insertSql, params);
    const student = result.rows[0];

    return res.status(201).json(student);
  } catch (err) {
    // Handle unique constraint or general server error
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
