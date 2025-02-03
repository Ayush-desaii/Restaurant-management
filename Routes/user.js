const express = require("express")
const route = express.Router()
const { pool } = require("../db")

route.post("/", async (req, res) => {
    const { userName, mobileNo, email, address } = req.body;
    try {
      const newUser = await pool.query(
        "INSERT INTO userMaster (userName, mobileNo, email, address) VALUES ($1, $2, $3, $4) RETURNING *",
        [userName, mobileNo, email, address]
      );
      res.json(newUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/", async (req, res) => {
    try {
      const users = await pool.query("SELECT * FROM userMaster;");
      res.json(users.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const user = await pool.query("SELECT * FROM userMaster WHERE userID = $1", [id]);
      
      res.status(200).json(user.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.post("/mobile", async (req, res) => {
    const { mobileNo } = req.body;
    try {
      const newUser = await pool.query(
        "SELECT * FROM userMaster WHERE mobileNo = $1",
        [mobileNo]
      );
      res.json(newUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = route