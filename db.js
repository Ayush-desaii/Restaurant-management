const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
  });

const createTables = async () => {
    try {
      const client = await pool.connect();
  
      // Create userMaster table
      await client.query(`
        CREATE TABLE IF NOT EXISTS userMaster (
          userID SERIAL PRIMARY KEY,
          userName VARCHAR(100) NOT NULL,
          mobileNo VARCHAR(15) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          address TEXT
        );
      `);
      console.log("✅ userMaster table created!");
  
      // Create itemMaster table
      await client.query(`
        CREATE TABLE IF NOT EXISTS itemMaster (
          itemID SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          description TEXT
        );
      `);
      console.log("✅ itemMaster table created!");
  
      // Create order table
      await client.query(`
        CREATE TABLE IF NOT EXISTS orders (
          orderID SERIAL PRIMARY KEY,
          userID INT NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(50) DEFAULT 'Pending',
          FOREIGN KEY (userID) REFERENCES userMaster(userID) ON DELETE CASCADE
        );
      `);
      console.log("✅ orders table created!");
  
      // Create orderItem table
      await client.query(`
        CREATE TABLE IF NOT EXISTS orderItem (
          orderItemID SERIAL PRIMARY KEY,
          orderID INT NOT NULL,
          itemID INT NOT NULL,
          quantity INT NOT NULL CHECK (quantity > 0),
          price DECIMAL(10,2) NOT NULL,
          FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE CASCADE,
          FOREIGN KEY (itemID) REFERENCES itemMaster(itemID) ON DELETE CASCADE
        );
      `);
      console.log("✅ orderItem table created!");
  
      client.release();
    } catch (error) {
      console.error("❌ Error creating tables:", error);
    }
  };

module.exports = {pool, createTables};
