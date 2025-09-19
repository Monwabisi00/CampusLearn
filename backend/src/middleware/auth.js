import jwt from "jsonwebtoken";
import pool from "../db.js";

const auth = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid auth header" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // optional: fetch student info
    const result = await pool.query(
      "SELECT student_id, name, email FROM students WHERE student_id = $1",
      [payload.student_id]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "Student not found" });

    req.user = result.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default auth;
