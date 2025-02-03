const express = require("express")
const route = express.Router()
const { pool } = require("../db")

route.post("/", async (req, res) => {
    const { userID, amount, orderDate, status } = req.body;
    try {
      const newUser = await pool.query(
        "INSERT INTO orders (userID, amount, orderDate, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [userID, amount, orderDate, status]
      );
      res.json(newUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/", async (req, res) => {
    try {
      const orders = await pool.query("SELECT * FROM orders;");
      res.json(orders.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const order = await pool.query("SELECT * FROM orders WHERE orderID = $1", [id]);
      
      res.status(200).json(order.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

route.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await pool.query(
        "SELECT * FROM orders WHERE userID = $1",
        [id]
      );
      res.json(user.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = route