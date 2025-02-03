const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
  });

const createTable = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(150) UNIQUE
        );
      `);
      console.log("Users table created successfully!");
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

module.exports = {pool, createTable};
