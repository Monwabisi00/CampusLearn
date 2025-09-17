const express = require("express");
const cors = require("cors");
const pool = require("./database");
require("dotenv").config();

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
    const newStudent = await pool.query("INSERT INTO students (name, email, password, academic_details) VALUES ($1, $2, $3, $4)", [req.body.name, req.body.email, req.body.password, req.body.academic_details]);

    res.json(newStudent);
  } catch (err) {
    console.error(err.message);
  }
  
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
