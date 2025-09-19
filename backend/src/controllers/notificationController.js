import pool from "../config/db.js";

// Get notifications for logged-in student
const getNotifications = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
  
    try {
      const q = `
        SELECT notification_id, type, content, created_at, is_read
        FROM notifications
        WHERE recipient_id = $1
        ORDER BY created_at DESC
      `;
      const { rows } = await pool.query(q, [student_id]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    const student_id = req.user && req.user.student_id;
    const { id } = req.params;
    if (!student_id) return res.status(401).json({ error: "Authentication required" });
  
    try {
      const { rows } = await pool.query(
        "UPDATE notifications SET is_read = true WHERE notification_id = $1 AND recipient_id=$2 RETURNING *",
        [id, student_id]
      );
      if (rows.length === 0) return res.status(404).json({ error: "Notification not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    getNotifications,
    markAsRead
};