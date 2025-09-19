import pool from "../config/db.js";

// Create a response to a query
const createResponse = async (req, res) => {
    const tutorStudentId = req.user && req.user.student_id;
    const { query_id, content } = req.body;
    if (!tutorStudentId) return res.status(401).json({ error: "Authentication required" });
    if (!query_id || !content) return res.status(400).json({ error: "query_id and content required" });
  
    try {
      // get query + topic + module
      const q = `
        SELECT q.query_id, q.topic_id, t.module_id
        FROM queries q
        JOIN topics t ON t.topic_id = q.topic_id
        WHERE q.query_id = $1
      `;
      const queryRes = await pool.query(q, [query_id]);
      if (queryRes.rows.length === 0) return res.status(404).json({ error: "Query not found" });
      const query = queryRes.rows[0];
  
      // check tutor eligibility
      const tutorRes = await pool.query("SELECT * FROM tutors WHERE student_id=$1", [tutorStudentId]);
      if (tutorRes.rows.length === 0) return res.status(403).json({ error: "You are not a tutor" });
      const tutor = tutorRes.rows[0];
      if (tutor.module_id !== query.module_id) {
        return res.status(403).json({ error: "You cannot respond to queries outside your module" });
      }
  
      const insertQ = `
        INSERT INTO responses (query_id, tutor_id, content)
        VALUES ($1, $2, $3) RETURNING *
      `;
      const { rows } = await pool.query(insertQ, [query_id, tutor.tutor_id, content]);
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// List responses for a query
const listResponsesByQuery = async (req, res) => {
    const { queryId } = req.params;
    try {
      const q = `
        SELECT r.response_id, r.content, r.created_at,
               t.tutor_id, s.name AS tutor_name
        FROM responses r
        JOIN tutors t ON t.tutor_id = r.tutor_id
        JOIN students s ON s.student_id = t.student_id
        WHERE r.query_id = $1
        ORDER BY r.created_at ASC
      `;
      const { rows } = await pool.query(q, [queryId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Delete response (only the tutor who posted it can delete)
const deleteResponse = async (req, res) => {
    const { id } = req.params;
    const tutorStudentId = req.user && req.user.student_id;
  
    try {
      const rRes = await pool.query("SELECT * FROM responses WHERE response_id=$1", [id]);
      if (rRes.rows.length === 0) return res.status(404).json({ error: "Response not found" });
      const response = rRes.rows[0];
  
      // get tutor info
      const tRes = await pool.query("SELECT * FROM tutors WHERE tutor_id=$1", [response.tutor_id]);
      if (tRes.rows.length === 0) return res.status(400).json({ error: "Tutor not found" });
      const tutor = tRes.rows[0];
  
      if (Number(tutor.student_id) !== Number(tutorStudentId)) {
        return res.status(403).json({ error: "Forbidden: only the tutor who posted this response can delete it" });
      }
  
      await pool.query("DELETE FROM responses WHERE response_id=$1", [id]);
      res.json({ message: "Response deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    createResponse,
    listResponsesByQuery,
    deleteResponse
};