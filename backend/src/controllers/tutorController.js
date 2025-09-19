import pool from "../config/db.js";

// Create tutor record for an existing student
const createTutor = async (req, res) => {
    const { student_id, module_id } = req.body;

    // enforce that the caller can only create a tutor record for themselves
    if (!req.user || Number(req.user.student_id) !== Number(student_id)) {
        return res.status(403).json({ error: "Forbidden: you can only create a tutor record for your own account." });
    }

    if (!student_id || !module_id) {
        return res.status(400).json({ error: "student_id and module_id are required" });
    }

    try {
        const q = `INSERT INTO tutors (student_id, module_id)
                VALUES ($1, $2)
                RETURNING tutor_id, student_id, module_id`;
        const { rows } = await pool.query(q, [student_id, module_id]);
        res.status(201).json(rows[0]);
    } catch (err) {
        if (err.code === "23503") {
        return res.status(400).json({ error: "Invalid student_id or module_id" });
        }
        if (err.code === "23505") {
        return res.status(400).json({ error: "This student is already registered as a tutor" });
        }
        res.status(500).json({ error: err.message });
    }
};

// Get tutor by ID
const getTutor = async (req, res) => {
    const id = req.params.id;
    try {
        const q = `
        SELECT t.tutor_id, t.student_id, t.module_id,
                s.name AS student_name, s.email AS student_email,
                m.name AS module_name
        FROM tutors t
        JOIN students s ON s.student_id = t.student_id
        LEFT JOIN modules m ON m.module_id = t.module_id
        WHERE t.tutor_id = $1
        `;
        const { rows } = await pool.query(q, [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Tutor not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update tutor (reassign to another module)
const updateTutor = async (req, res) => {
    const id = req.params.id;
    const { module_id } = req.body;

    // optionally enforce owner-only updates: check tutor belongs to req.user.student_id
    try {
        // check current tutor
        const t = await pool.query("SELECT * FROM tutors WHERE tutor_id = $1", [id]);
        if (t.rows.length === 0) return res.status(404).json({ error: "Tutor not found" });

        if (!req.user || Number(req.user.student_id) !== Number(t.rows[0].student_id)) {
        return res.status(403).json({ error: "Forbidden: only the tutor owner can update this record." });
        }

        const { rows } = await pool.query(
        "UPDATE tutors SET module_id = COALESCE($1, module_id) WHERE tutor_id=$2 RETURNING *",
        [module_id, id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete tutor
const deleteTutor = async (req, res) => {
    const id = req.params.id;
    try {
        // check ownership
        const t = await pool.query("SELECT * FROM tutors WHERE tutor_id = $1", [id]);
        if (t.rows.length === 0) return res.status(404).json({ error: "Tutor not found" });

        if (!req.user || Number(req.user.student_id) !== Number(t.rows[0].student_id)) {
        return res.status(403).json({ error: "Forbidden: only the tutor owner can delete this record." });
        }

        await pool.query("DELETE FROM tutors WHERE tutor_id=$1", [id]);
        res.json({ message: "Tutor removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// List all tutors
const listTutors = async (req, res) => {
    try {
      const q = `
        SELECT t.tutor_id, t.student_id, t.module_id,
               s.name AS student_name, m.name AS module_name
        FROM tutors t
        JOIN students s ON s.student_id = t.student_id
        LEFT JOIN modules m ON m.module_id = t.module_id
        ORDER BY t.tutor_id DESC
      `;
      const { rows } = await pool.query(q);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    createTutor,
    getTutor,
    updateTutor,
    deleteTutor,
    listTutors
};