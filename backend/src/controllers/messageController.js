import pool from "../config/db.js";

// Send a message
const sendMessage = async (req, res) => {
    const sender_id = req.user && req.user.student_id;
    const { receiver_id, content } = req.body;
    if (!sender_id) return res.status(401).json({ error: "Authentication required" });
    if (!receiver_id || !content) return res.status(400).json({ error: "receiver_id and content required" });
  
    try {
      // ensure receiver exists
      const r = await pool.query("SELECT student_id FROM students WHERE student_id=$1", [receiver_id]);
      if (r.rows.length === 0) return res.status(404).json({ error: "Receiver not found" });
  
      const { rows } = await pool.query(
        "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *",
        [sender_id, receiver_id, content]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Get all messages for the logged-in student (inbox + sent)
const getMessagesForStudent = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
  
    try {
      const q = `
        SELECT m.message_id, m.sender_id, s1.name AS sender_name,
               m.receiver_id, s2.name AS receiver_name,
               m.content, m.sent_at
        FROM messages m
        JOIN students s1 ON s1.student_id = m.sender_id
        JOIN students s2 ON s2.student_id = m.receiver_id
        WHERE m.sender_id=$1 OR m.receiver_id=$1
        ORDER BY m.sent_at ASC
      `;
      const { rows } = await pool.query(q, [student_id]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Get conversation between logged-in student and another student
const getConversation = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    const { otherId } = req.params;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
  
    try {
      const q = `
        SELECT m.message_id, m.sender_id, s1.name AS sender_name,
               m.receiver_id, s2.name AS receiver_name,
               m.content, m.sent_at
        FROM messages m
        JOIN students s1 ON s1.student_id = m.sender_id
        JOIN students s2 ON s2.student_id = m.receiver_id
        WHERE (m.sender_id=$1 AND m.receiver_id=$2)
           OR (m.sender_id=$2 AND m.receiver_id=$1)
        ORDER BY m.sent_at ASC
      `;
      const { rows } = await pool.query(q, [student_id, otherId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    sendMessage,
    getMessagesForStudent,
    getConversation
};