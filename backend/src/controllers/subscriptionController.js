import pool from "../config/db.js";

// Subscribe to a topic
const subscribe = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    const { topic_id } = req.body;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
    if (!topic_id) return res.status(400).json({ error: "topic_id is required" });
  
    try {
      // ensure topic exists
      const t = await pool.query("SELECT topic_id, title, created_by FROM topics WHERE topic_id = $1", [topic_id]);
      if (t.rows.length === 0) return res.status(404).json({ error: "Topic not found" });
  
      // check duplicate
      const exists = await pool.query(
        "SELECT * FROM subscriptions WHERE student_id = $1 AND topic_id = $2",
        [student_id, topic_id]
      );
      if (exists.rows.length > 0) return res.status(400).json({ error: "Already subscribed to this topic" });
  
      const { rows } = await pool.query(
        "INSERT INTO subscriptions (student_id, topic_id) VALUES ($1, $2) RETURNING *",
        [student_id, topic_id]
      );
  
      // optional: notify topic creator that someone subscribed
      const notifContent = `Student (id ${student_id}) subscribed to your topic "${t.rows[0].title}".`;
      await pool.query(
        "INSERT INTO notifications (recipient_id, type, content) VALUES ($1, $2, $3)",
        [t.rows[0].created_by, "newSubscriber", notifContent]
      );
  
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Unsubscribe from a topic
const unsubscribe = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    const topic_id = req.params.topicId;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
  
    try {
      await pool.query("DELETE FROM subscriptions WHERE student_id = $1 AND topic_id = $2", [student_id, topic_id]);
      res.json({ message: "Unsubscribed" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// List subscriptions for a student
const listForStudent = async (req, res) => {
    const { studentId } = req.params;
    if (!req.user || Number(req.user.student_id) !== Number(studentId)) {
      return res.status(403).json({ error: "Forbidden: only the owner can view their subscriptions." });
    }
  
    try {
      const q = `
        SELECT s.subscription_id, s.subscribed_at, t.topic_id, t.title, t.module_id
        FROM subscriptions s
        JOIN topics t ON t.topic_id = s.topic_id
        WHERE s.student_id = $1
        ORDER BY s.subscribed_at DESC
      `;
      const { rows } = await pool.query(q, [studentId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// List subscribers for a topic
const listSubscribersForTopic = async (req, res) => {
    const { topicId } = req.params;
    try {
      const q = `
        SELECT s.subscription_id, s.subscribed_at, st.student_id, st.name, st.email
        FROM subscriptions s
        JOIN students st ON st.student_id = s.student_id
        WHERE s.topic_id = $1
        ORDER BY s.subscribed_at ASC
      `;
      const { rows } = await pool.query(q, [topicId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    subscribe,
    unsubscribe,
    listForStudent,
    listSubscribersForTopic
};