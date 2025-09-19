import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT student_id, name, email, password_hash FROM students WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const student = result.rows[0];

    // verify password
    const match = await bcrypt.compare(password, student.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    // sign token
    const token = jwt.sign(
      { student_id: student.student_id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      student: { student_id: student.student_id, name: student.name, email: student.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
    try {
    const { name, email, password, academic_details } = req.body;

    // check if email exists
    const existing = await pool.query(
      "SELECT student_id FROM students WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    // hash password
    const password_hash = await bcrypt.hash(password, 10);

    // insert student
    const result = await pool.query(
      `INSERT INTO students (name, email, password_hash, academic_details)
       VALUES ($1, $2, $3, $4)
       RETURNING student_id, name, email`,
      [name, email, password_hash, academic_details || null]
    );

    res.status(201).json({ message: "Student registered", student: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export default { login, register };
