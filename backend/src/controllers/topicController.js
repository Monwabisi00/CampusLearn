import pool from "../config/db.js";

// Create topic
const createTopic = async (req, res) => {
    const { title, description, module_id } = req.body;
    const created_by = req.user && req.user.student_id;
  
    if (!created_by) return res.status(401).json({ error: "Authentication required" });
    if (!title || !module_id) return res.status(400).json({ error: "title and module_id are required" });
  
    try {
      // ensure module exists
      const m = await pool.query("SELECT module_id, name FROM modules WHERE module_id = $1", [module_id]);
      if (m.rows.length === 0) return res.status(400).json({ error: "Module not found" });
  
      const insertQ = `INSERT INTO topics (title, description, created_by, module_id)
                       VALUES ($1, $2, $3, $4) RETURNING *`;
      const { rows } = await pool.query(insertQ, [title, description || null, created_by, module_id]);
      const topic = rows[0];
  
      // Notify tutors who are assigned to this module.
      const tutorsQ = `SELECT student_id FROM tutors WHERE module_id = $1`;
      const tutors = await pool.query(tutorsQ, [module_id]);
  
      if (tutors.rows.length > 0) {
        const notifPromises = tutors.rows.map(tutorRow => {
          const content = `New topic "${title}" was created in module "${m.rows[0].name}".`;
          return pool.query(
            `INSERT INTO notifications (recipient_id, type, content) VALUES ($1, $2, $3)`,
            [tutorRow.student_id, "newTopic", content]
          );
        });
        await Promise.all(notifPromises);
      }
  
      res.status(201).json(topic);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// List topics
const listTopics = async (req, res) => {
    // optional query params: module_id, created_by, q (search)
    const { module_id, created_by, q } = req.query;
    try {
      let base = `SELECT t.topic_id, t.title, t.description, t.created_at, t.module_id,
                         t.created_by, s.name AS creator_name, m.name AS module_name
                  FROM topics t
                  JOIN students s ON s.student_id = t.created_by
                  LEFT JOIN modules m ON m.module_id = t.module_id`;
      const clauses = [];
      const values = [];
  
      if (module_id) {
        values.push(module_id);
        clauses.push(`t.module_id = $${values.length}`);
      }
      if (created_by) {
        values.push(created_by);
        clauses.push(`t.created_by = $${values.length}`);
      }
      if (q) {
        values.push(`%${q}%`);
        clauses.push(`(t.title ILIKE $${values.length} OR t.description ILIKE $${values.length})`);
      }
  
      if (clauses.length > 0) base += " WHERE " + clauses.join(" AND ");
      base += " ORDER BY t.created_at DESC";
  
      const { rows } = await pool.query(base, values);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Get topic
const getTopic = async (req, res) => {
    const id = req.params.id;
    try {
      const q = `SELECT t.topic_id, t.title, t.description, t.created_at, t.module_id,
                        t.created_by, s.name AS creator_name, m.name AS module_name
                 FROM topics t
                 JOIN students s ON s.student_id = t.created_by
                 LEFT JOIN modules m ON m.module_id = t.module_id
                 WHERE t.topic_id = $1`;
      const { rows } = await pool.query(q, [id]);
      if (rows.length === 0) return res.status(404).json({ error: "Topic not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Update topic
const updateTopic = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
  
    try {
      // ensure only creator can update
      const t = await pool.query("SELECT * FROM topics WHERE topic_id = $1", [id]);
      if (t.rows.length === 0) return res.status(404).json({ error: "Topic not found" });
  
      if (!req.user || Number(req.user.student_id) !== Number(t.rows[0].created_by)) {
        return res.status(403).json({ error: "Forbidden: only the creator can update the topic" });
      }
  
      const { rows } = await pool.query(
        `UPDATE topics SET title = COALESCE($1, title), description = COALESCE($2, description)
         WHERE topic_id = $3 RETURNING *`,
        [title, description, id]
      );
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Delete topic
const deleteTopic = async (req, res) => {
    const id = req.params.id;
    try {
      // ensure only creator can delete
      const t = await pool.query("SELECT * FROM topics WHERE topic_id = $1", [id]);
      if (t.rows.length === 0) return res.status(404).json({ error: "Topic not found" });
  
      if (!req.user || Number(req.user.student_id) !== Number(t.rows[0].created_by)) {
        return res.status(403).json({ error: "Forbidden: only the creator can delete the topic" });
      }
  
      await pool.query("DELETE FROM topics WHERE topic_id = $1", [id]);
      res.json({ message: "Topic deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    createTopic,
    listTopics,
    getTopic,
    updateTopic,
    deleteTopic
};