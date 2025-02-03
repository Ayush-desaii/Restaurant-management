const express = require("express")
const route = express.Router()
const { pool } = require("../db")

route.post("/:id/item", async (req, res) => {
    const { itemID, quantity } = req.body;
    const { id } = req.params;
    try {

      await pool.query("BEGIN"); 

      const price = await pool.query(
        "SELECT price FROM itemMaster WHERE itemID = $1",
        [itemID]
      );

      if (price.rows.length === 0) {
        await pool.query("ROLLBACK");
        return res.status(404).json({ error: "Item not found" });
      }

      const newprice = parseFloat(price.rows[0].price);
      const totalprice = newprice * quantity;



      const orderitem = await pool.query(
        "INSERT INTO orderItem (orderID, itemID, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
        [id, itemID, quantity, totalprice]
      );

      const order = await pool.query(
        `UPDATE orders 
   SET amount = amount + COALESCE(
       (SELECT SUM(price) FROM orderItem WHERE orderID = $1 AND itemID = $2),
       0
   ) 
   WHERE orderID = $1`,[id, itemID]
      );

      await pool.query("COMMIT");

      res.json(orderitem.rows);
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


  // typescript and typeorm
  
module.exports = route