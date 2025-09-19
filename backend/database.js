<<<<<<< Updated upstream:backend/database.js
const { Pool } = require("pg");
require("dotenv").config();
=======
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
>>>>>>> Stashed changes:backend/src/config/db.js

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});

<<<<<<< Updated upstream:backend/database.js
module.exports = pool;
=======
export default pool;
>>>>>>> Stashed changes:backend/src/config/db.js
