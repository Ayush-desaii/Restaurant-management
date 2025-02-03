const express = require("express");
const { pool, createTables } = require("./db")

const app = express();
app.use(express.json());




// API Route to Add a User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Route to Get Users
app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users;");
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize Database and Start Server
(async () => {
  await createTables();
  app.listen(3000, () => console.log("Server running on port 3000"));
})();
