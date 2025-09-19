import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register
const register = async (req, res) => {
    const { name, email, password, academic_details } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        const q = `INSERT INTO students (name, email, password_hash, academic_details)
                    VALUES ($1, $2, $3, $4) RETURNING student_id, name, email, academic_details, created_at`;
        const values = [name, email, hashed, academic_details || null];

        const { rows } = await pool.query(q, values);
        const student = rows[0];

        // sign token
        const token = jwt.sign({ student_id: student.student_id }, process.env.JWT_SECRET, { expiresIn: "8h" });

        res.status(201).json({ token, student });
    } catch (err) {
        if (err.code === "23505") { // unique_violation
          return res.status(400).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: err.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const { rows } = await pool.query("SELECT * FROM students WHERE email=$1", [email]);
        if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const student = rows[0];
        const ok = await bcrypt.compare(password, student.password_hash);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ student_id: student.student_id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        // return safe student object
        const safeStudent = {
            student_id: student.student_id,
            name: student.name,
            email: student.email,
            academic_details: student.academic_details,
            created_at: student.created_at,
        };

        res.json({ token, student: safeStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get profile
const getProfile = async (req, res) => {
    // allow /students/:id or use token to view own profile
    const id = req.params.id;
    try {
        const { rows } = await pool.query(
        "SELECT student_id, name, email, academic_details, created_at FROM students WHERE student_id=$1",
        [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Student not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    const id = req.params.id;
    const { name, academic_details } = req.body;

    // security: only allow if token student_id === id or if admin (no admin here)
    if (!req.user || Number(req.user.student_id) !== Number(id)) {
        return res.status(403).json({ error: "Forbidden. Only owner can update profile." });
    }

    try {
        const { rows } = await pool.query(
        `UPDATE students SET name = COALESCE($1, name), academic_details = COALESCE($2, academic_details)
        WHERE student_id = $3 RETURNING student_id, name, email, academic_details, created_at`,
        [name, academic_details, id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete account
const deleteAccount = async (req, res) => {
    const id = req.params.id;
    if (!req.user || Number(req.user.student_id) !== Number(id)) {
        return res.status(403).json({ error: "Forbidden. Only owner can delete account." });
    }
    try {
        await pool.query("DELETE FROM students WHERE student_id=$1", [id]);
        res.json({ message: "Account deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    register,
    login,
    getProfile,
    updateProfile,
    deleteAccount
};