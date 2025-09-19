import app from "./app.js"
const PORT = process.env.PORT || 5000;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});

module.exports = pool;


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});