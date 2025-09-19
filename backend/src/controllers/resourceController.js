import pool from "../config/db.js";

// Upload resource
const createResource = async (req, res) => {
    const { topic_id, type } = req.body;
    const tutorStudentId = req.user && req.user.student_id;
    if (!tutorStudentId) return res.status(401).json({ error: "Authentication required" });
  
    // file uploaded by multer
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    if (!filePath) return res.status(400).json({ error: "File upload required" });
  
    try {
      // check topic exists
      const topicRes = await pool.query("SELECT * FROM topics WHERE topic_id = $1", [topic_id]);
      if (topicRes.rows.length === 0) return res.status(404).json({ error: "Topic not found" });
      const topic = topicRes.rows[0];
  
      // check tutor eligibility
      const tutorRes = await pool.query("SELECT * FROM tutors WHERE student_id = $1", [tutorStudentId]);
      if (tutorRes.rows.length === 0) {
        return res.status(403).json({ error: "You are not a registered tutor" });
      }
      const tutor = tutorRes.rows[0];
      if (tutor.module_id !== topic.module_id) {
        return res.status(403).json({ error: "You are not allowed to upload resources for this topic's module" });
      }
  
      // insert resource
      const insertQ = `INSERT INTO resources (topic_id, uploaded_by, type, file_path)
                       VALUES ($1, $2, $3, $4) RETURNING *`;
      const { rows } = await pool.query(insertQ, [topic_id, tutor.tutor_id, type || "file", filePath]);
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// List resources for a topic
const getResourcesByTopic = async (req, res) => {
    const { topicId } = req.params;
    try {
      const q = `
        SELECT r.resource_id, r.type, r.file_path, r.uploaded_at,
               t.tutor_id, s.name AS tutor_name
        FROM resources r
        JOIN tutors t ON t.tutor_id = r.uploaded_by
        JOIN students s ON s.student_id = t.student_id
        WHERE r.topic_id = $1
        ORDER BY r.uploaded_at DESC
      `;
      const { rows } = await pool.query(q, [topicId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Delete resource
const deleteResource = async (req, res) => {
    const { id } = req.params;
    const tutorStudentId = req.user && req.user.student_id;
    if (!tutorStudentId) return res.status(401).json({ error: "Authentication required" });
  
    try {
      // get resource
      const rRes = await pool.query("SELECT * FROM resources WHERE resource_id = $1", [id]);
      if (rRes.rows.length === 0) return res.status(404).json({ error: "Resource not found" });
      const resource = rRes.rows[0];
  
      // get tutor record
      const tRes = await pool.query("SELECT * FROM tutors WHERE tutor_id = $1", [resource.uploaded_by]);
      if (tRes.rows.length === 0) return res.status(400).json({ error: "Tutor not found" });
      const tutor = tRes.rows[0];
  
      if (Number(tutor.student_id) !== Number(tutorStudentId)) {
        return res.status(403).json({ error: "Forbidden: you can only delete your own uploads" });
      }
  
      await pool.query("DELETE FROM resources WHERE resource_id = $1", [id]);
      res.json({ message: "Resource deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    createResource,
    getResourcesByTopic,
    deleteResource
};