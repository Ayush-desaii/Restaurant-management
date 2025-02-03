const express = require("express")
const route = express.Router()
const { pool } = require("../db")

route.post("/", async (req, res) => {
    const { name, price, description } = req.body;
    try {
      const item = await pool.query(
        "INSERT INTO itemMaster (name, price, description) VALUES ($1, $2, $3) RETURNING *",
        [name, price, description]
      );
      res.json(item.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/", async (req, res) => {
    try {
      const items = await pool.query("SELECT * FROM itemMaster;");
      res.json(items.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const item = await pool.query("SELECT * FROM itemMaster WHERE itemID = $1", [id]);
      
      res.status(200).json(item.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = route