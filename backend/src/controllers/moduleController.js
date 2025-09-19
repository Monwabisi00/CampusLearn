import pool from "../config/db.js";

// List modules
const listModules = async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM modules ORDER BY created_at DESC");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Get module
const getModule = async (req, res) => {
    const id = req.params.id;
    try {
      const { rows } = await pool.query("SELECT * FROM modules WHERE module_id=$1", [id]);
      if (rows.length === 0) return res.status(404).json({ error: "Module not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export default {
    listModules,
    getModule
};