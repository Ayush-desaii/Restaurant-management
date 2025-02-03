const { pool } = require("../db");

const getOrder = async (req, res) => { 
  try {
    const orders = await pool.query("SELECT * FROM orders;");
    res.status(200).json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getOrder };