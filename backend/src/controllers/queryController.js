import pool from "../config/db.js";

// Create a query under a topic
const createQuery = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    const { topic_id, content } = req.body;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
    if (!topic_id || !content) return res.status(400).json({ error: "topic_id and content required" });

    try {
      const t = await pool.query("SELECT * FROM topics WHERE topic_id=$1", [topic_id]);
      if (t.rows.length === 0) return res.status(404).json({ error: "Topic not found" });

      const { rows } = await pool.query(
        "INSERT INTO queries (topic_id, created_by, content) VALUES ($1, $2, $3) RETURNING *",
        [topic_id, student_id, content]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getQueriesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = `
      SELECT q.query_id, q.topic_id, q.content, q.created_at,
             t.title AS topic_title, t.description AS topic_description,
             s.name AS student_name
      FROM queries q
      JOIN topics t ON t.topic_id = q.topic_id
      JOIN students s ON s.student_id = q.created_by
      WHERE q.created_by = $1
      ORDER BY q.created_at DESC
    `;
    const { rows } = await pool.query(q, [userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// List all queries for a topic
const listQueriesByTopic = async (req, res) => {
    const { topicId } = req.params;
    try {
      const q = `
        SELECT q.query_id, q.content, q.created_at, q.created_by,
               s.name AS student_name
        FROM queries q
        JOIN students s ON s.student_id = q.created_by
        WHERE q.topic_id = $1
        ORDER BY q.created_at ASC
      `;
      const { rows } = await pool.query(q, [topicId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Delete a query (only creator can delete)
const deleteQuery = async (req, res) => {
    const { id } = req.params;
    const student_id = req.user && req.user.student_id;
    try {
      const qRes = await pool.query("SELECT * FROM queries WHERE query_id=$1", [id]);
      if (qRes.rows.length === 0) return res.status(404).json({ error: "Query not found" });
      const query = qRes.rows[0];

      if (Number(query.created_by) !== Number(student_id)) {
        return res.status(403).json({ error: "Forbidden: only the creator can delete this query" });
      }

      await pool.query("DELETE FROM queries WHERE query_id=$1", [id]);
      res.json({ message: "Query deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    createQuery,
    getQueriesByUserId,
    listQueriesByTopic,
    deleteQuery
};
