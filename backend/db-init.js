import pool from "./database.js";

const createTables = async () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(userTable);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
};

createTables();
